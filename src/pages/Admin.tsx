import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../lib/supabase';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { FileText, Image, Send, X, ZoomIn, Edit, Trash2, Replace, CheckCircle, AlertCircle, AlertTriangle, Info, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Default hashtags
  const defaultHashtags = [
    '#Community', '#Programming', '#WebDevelopment', '#Mobile', '#AI',
    '#MachineLearning', '#DataScience', '#Cybersecurity', '#Blockchain',
    '#IoT', '#Cloud', '#DevOps', '#UI/UX', '#GameDevelopment',
    '#OpenSource', '#Innovation', '#Technology', '#Education',
    '#Research', '#Collaboration'
  ];

  // News management states
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImages, setEditImages] = useState<File[]>([]);

  // Replace Image Modal states
  const [replaceImageModalOpen, setReplaceImageModalOpen] = useState(false);
  const [replacingNews, setReplacingNews] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  // Crop states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState('');

  // Project management states
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectLink, setProjectLink] = useState('');
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Edit Project Modal states
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editProjectTitle, setEditProjectTitle] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editProjectLink, setEditProjectLink] = useState('');
  const [editSelectedDevelopers, setEditSelectedDevelopers] = useState<string[]>([]);
  const [editSelectedHashtags, setEditSelectedHashtags] = useState<string[]>([]);
  const [editProjectImage, setEditProjectImage] = useState<File | null>(null);

  // Replace Project Image Modal states
  const [replaceProjectImageModalOpen, setReplaceProjectImageModalOpen] = useState(false);
  const [replacingProject, setReplacingProject] = useState<any>(null);
  const [newProjectImageFile, setNewProjectImageFile] = useState<File | null>(null);

  // Notification states
  const [notifications, setNotifications] = useState<any[]>([]);

  // Load news on component mount
  useEffect(() => {
    fetchNews();
    fetchProjects();
    fetchTeamMembers();
  }, []);

  const fetchNews = async () => {
    setLoadingNews(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
    } else {
      setNewsList(data || []);
    }
    setLoadingNews(false);
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjectsList(data || []);
    }
    setLoadingProjects(false);
  };

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
    } else {
      setTeamMembers(data || []);
    }
  };

  // Notification functions
  const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after 8 seconds (increased from 5)
    setTimeout(() => {
      removeNotification(id);
    }, 8000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm('Are you sure you want to delete this news?')) return;

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', newsId);

    if (error) {
      console.error('Error deleting news:', error);
      addNotification('Error deleting news', 'error');
    } else {
      addNotification('News deleted successfully!', 'success');
      fetchNews(); // Refresh the list
    }
  };

  const handleEditNews = (news: any) => {
    setEditingNews(news);
    setEditTitle(news.title);
    setEditContent(news.content);
    setEditImages([]);
    setEditModalOpen(true);
  };

  const handleReplaceImage = (news: any) => {
    setReplacingNews(news);
    setSelectedImageIndex(0);
    setNewImageFile(null);
    setReplaceImageModalOpen(true);
  };

  const handleReplaceImageSubmit = async () => {
    if (!newImageFile || !replacingNews) return;

    setUploading(true);

    try {
      // Upload the new image
      const fileName = `${Date.now()}-${newImageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, newImageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        addNotification(`Error uploading image: ${uploadError.message}`, 'error');
        return;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      // Update the news with the new image URL
      const updatedImages = [...replacingNews.images];
      updatedImages[selectedImageIndex] = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('news')
        .update({ images: updatedImages })
        .eq('id', replacingNews.id);

      if (updateError) {
        console.error('Error updating news:', updateError);
        addNotification('Error updating news', 'error');
      } else {
        addNotification('Image replaced successfully!', 'success');
        setReplaceImageModalOpen(false);
        setReplacingNews(null);
        setNewImageFile(null);
        fetchNews(); // Refresh the list
      }
    } catch (error) {
      console.error('Error replacing image:', error);
      addNotification('Error replacing image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrls = editingNews.images; // Keep existing images by default

    // Upload new images if any
    if (editImages.length > 0) {
      const uploadedUrls = await uploadImages(editImages);
      if (uploadedUrls.length > 0) {
        imageUrls = uploadedUrls;
      }
    }

    const { error } = await supabase
      .from('news')
      .update({
        title: editTitle,
        content: editContent,
        images: imageUrls
      })
      .eq('id', editingNews.id);

    if (error) {
      console.error('Error updating news:', error);
      addNotification('Error updating news', 'error');
    } else {
      addNotification('News updated successfully!', 'success');
      setEditModalOpen(false);
      setEditingNews(null);
      fetchNews(); // Refresh the list
    }
    setUploading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Validate file types and sizes
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          addNotification(`${file.name} is not an image file`, 'warning');
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          addNotification(`${file.name} is too large (max 5MB)`, 'warning');
          return false;
        }
        return true;
      });
      setImages(validFiles);

      // Start cropping the first image
      if (validFiles.length > 0) {
        openCropModal(0, validFiles[0]);
      }
    }
  };

  const openCropModal = async (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCurrentImageIndex(index);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async (imageSrc: string, pixelCrop: any): Promise<File> => {
    const image = new (window as any).Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx?.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });
            resolve(file);
          }
        }, 'image/jpeg', 0.95);
      };
    });
  };

  const handleCropSave = async () => {
    if (croppedAreaPixels && imageSrc) {
      const croppedImage = await createCroppedImage(imageSrc, croppedAreaPixels);
      const newImages = [...images];
      newImages[currentImageIndex] = croppedImage;
      setImages(newImages);
      setCropModalOpen(false);

      // Move to next image if available
      if (currentImageIndex < images.length - 1) {
        openCropModal(currentImageIndex + 1, images[currentImageIndex + 1]);
      }
    }
  };

  const uploadImages = async (imageFiles: File[] = images) => {
    const uploadedUrls: string[] = [];

    for (const image of imageFiles) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, image);

      if (error) {
        console.error('Error uploading image:', error);
        addNotification(`Error uploading ${image.name}: ${error.message}`, 'error');
        return []; // Stop uploading if one fails
      } else {
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const imageUrls = await uploadImages();

    const { error } = await supabase
      .from('news')
      .insert([{ title, content, images: imageUrls }]);

    if (error) {
      console.error('Error adding news:', error);
      addNotification('Error adding news', 'error');
    } else {
      addNotification('News added successfully!', 'success');
      setTitle('');
      setContent('');
      setImages([]);
    }
    setUploading(false);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';
    if (projectImage) {
      const uploadedUrls = await uploadImages([projectImage]);
      if (uploadedUrls.length > 0) {
        imageUrl = uploadedUrls[0];
      }
    }

    // Get the first developer for backward compatibility
    const firstDeveloper = selectedDevelopers.length > 0 ? teamMembers.find(member => member.id === selectedDevelopers[0]) : null;

    const { error } = await supabase
      .from('projects')
      .insert([{
        title: projectTitle,
        description: projectDescription,
        image: imageUrl,
        developer_name: firstDeveloper?.name || '',
        developer_image: firstDeveloper?.image || '',
        link: projectLink,
        developer_ids: selectedDevelopers,
        hashtags: selectedHashtags
      }]);

    if (error) {
      console.error('Error adding project:', error);
      addNotification('Error adding project', 'error');
    } else {
      addNotification('Project added successfully!', 'success');
      setProjectTitle('');
      setProjectDescription('');
      setProjectImage(null);
      setProjectLink('');
      setSelectedDevelopers([]);
      setSelectedHashtags([]);
      fetchProjects(); // Refresh the list
    }
    setUploading(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      addNotification('Error deleting project', 'error');
    } else {
      addNotification('Project deleted successfully!', 'success');
      fetchProjects(); // Refresh the list
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setEditProjectTitle(project.title);
    setEditProjectDescription(project.description);
    setEditProjectLink(project.link || '');
    setEditSelectedDevelopers(project.developer_ids || []);
    setEditSelectedHashtags(project.hashtags || []);
    setEditProjectImage(null);
    setEditProjectModalOpen(true);
  };

  const handleReplaceProjectImage = (project: any) => {
    setReplacingProject(project);
    setNewProjectImageFile(null);
    setReplaceProjectImageModalOpen(true);
  };

  const handleReplaceProjectImageSubmit = async () => {
    if (!newProjectImageFile || !replacingProject) return;

    setUploading(true);

    try {
      // Upload the new image
      const fileName = `${Date.now()}-${newProjectImageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, newProjectImageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        addNotification(`Error uploading image: ${uploadError.message}`, 'error');
        return;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      // Update the project with the new image URL
      const { error: updateError } = await supabase
        .from('projects')
        .update({ image: urlData.publicUrl })
        .eq('id', replacingProject.id);

      if (updateError) {
        console.error('Error updating project:', updateError);
        addNotification('Error updating project', 'error');
      } else {
        addNotification('Project image replaced successfully!', 'success');
        setReplaceProjectImageModalOpen(false);
        setReplacingProject(null);
        setNewProjectImageFile(null);
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      console.error('Error replacing project image:', error);
      addNotification('Error replacing project image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = editingProject.image; // Keep existing image by default

    // Upload new image if provided
    if (editProjectImage) {
      const uploadedUrls = await uploadImages([editProjectImage]);
      if (uploadedUrls.length > 0) {
        imageUrl = uploadedUrls[0];
      }
    }

    // Get the first developer for backward compatibility
    const firstDeveloper = editSelectedDevelopers.length > 0 ? teamMembers.find(member => member.id === editSelectedDevelopers[0]) : null;

    const { error } = await supabase
      .from('projects')
      .update({
        title: editProjectTitle,
        description: editProjectDescription,
        image: imageUrl,
        developer_name: firstDeveloper?.name || '',
        developer_image: firstDeveloper?.image || '',
        link: editProjectLink,
        developer_ids: editSelectedDevelopers,
        hashtags: editSelectedHashtags
      })
      .eq('id', editingProject.id);

    if (error) {
      console.error('Error updating project:', error);
      addNotification('Error updating project', 'error');
    } else {
      addNotification('Project updated successfully!', 'success');
      setEditProjectModalOpen(false);
      setEditingProject(null);
      fetchProjects(); // Refresh the list
    }
    setUploading(false);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
      {/* Add New News Form */}
      <LiquidGlassCard
        shadowIntensity='md'
        borderRadius='16px'
        glowIntensity='sm'
        className="max-w-2xl mx-auto p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700 mb-12"
      >
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Add New News
          </h1>
          <p className="text-gray-400 text-sm">Create and publish your latest news article</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <FileText className="w-4 h-4 mr-2 text-gray-400" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
              placeholder="Enter news title..."
              required
            />
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <FileText className="w-4 h-4 mr-2 text-gray-400" />
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 h-32 resize-none"
              placeholder="Enter news content..."
              required
            />
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <Image className="w-4 h-4 mr-2 text-gray-400" />
              Images (Multiple)
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
              accept="image/*"
            />
          </motion.div>
          <motion.button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Send className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Add News'}
          </motion.button>
        </form>
      </LiquidGlassCard>

      {/* Existing News Management */}
      <LiquidGlassCard
        shadowIntensity='md'
        borderRadius='16px'
        glowIntensity='sm'
        className="max-w-6xl mx-auto p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
      >
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Manage Existing News
          </h2>
          <p className="text-gray-400 text-sm">Edit or delete your published news articles</p>
        </motion.div>

        {loadingNews ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading news...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No news articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <LiquidGlassCard
                  shadowIntensity='sm'
                  borderRadius='12px'
                  glowIntensity='xs'
                  className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-600"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={news.images[0] || '/placeholder-news.jpg'}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReplaceImage(news)}
                        className="p-1.5 bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                        title="Replace Images"
                      >
                        <Replace className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEditNews(news)}
                        className="p-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                        title="Edit News"
                      >
                        <Edit className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteNews(news.id)}
                        className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                        title="Delete News"
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{news.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(news.created_at).toLocaleDateString()}</span>
                      <span>{news.images.length} image{news.images.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </LiquidGlassCard>

      {/* Edit News Modal */}
      {editModalOpen && editingNews && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
          >
            <LiquidGlassCard
              shadowIntensity='md'
              borderRadius='16px'
              glowIntensity='sm'
              className="max-w-2xl w-full mx-4 p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Edit News</h3>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleUpdateNews} className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter news title..."
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    Content
                  </label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 h-32 resize-none"
                    placeholder="Enter news content..."
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Image className="w-4 h-4 mr-2 text-gray-400" />
                    New Images (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        const files = Array.from(e.target.files);
                        const validFiles = files.filter(file => {
                          if (!file.type.startsWith('image/')) {
                            addNotification(`${file.name} is not an image file`, 'warning');
                            return false;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            addNotification(`${file.name} is too large (max 5MB)`, 'warning');
                            return false;
                          }
                          return true;
                        });
                        setEditImages(validFiles);
                      }
                    }}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
                    accept="image/*"
                  />
                  {editImages.length > 0 && (
                    <p className="text-sm text-gray-400 mt-1">
                      {editImages.length} new image{editImages.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Updating...' : 'Update News'}
                  </button>
                </div>
              </form>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Replace Image Modal */}
      {replaceImageModalOpen && replacingNews && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
          >
            <LiquidGlassCard
              shadowIntensity='md'
              borderRadius='16px'
              glowIntensity='sm'
              className="max-w-2xl w-full mx-4 p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Replace Images</h3>
                <button
                  onClick={() => setReplaceImageModalOpen(false)}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">{replacingNews.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {replacingNews.images.map((imageUrl: string, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-600 hover:border-green-500 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                      />
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-green-400 font-semibold text-sm">Selected</span>
                        </div>
                      )}
                      <div className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Image className="w-4 h-4 mr-2 text-gray-400" />
                    New Image for Position {selectedImageIndex + 1}
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        if (!file.type.startsWith('image/')) {
                          addNotification('Please select an image file', 'warning');
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          addNotification('File size must be less than 5MB', 'warning');
                          return;
                        }
                        setNewImageFile(file);
                      }
                    }}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
                    accept="image/*"
                  />
                  {newImageFile && (
                    <p className="text-sm text-gray-400 mt-1">
                      Selected: {newImageFile.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setReplaceImageModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReplaceImageSubmit}
                    disabled={!newImageFile || uploading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Replacing...' : 'Replace Image'}
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Project Modal */}
      {editProjectModalOpen && editingProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
          >
            <LiquidGlassCard
              shadowIntensity='md'
              borderRadius='16px'
              glowIntensity='sm'
              className="max-w-4xl w-full mx-4 p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Edit Project</h3>
                <button
                  onClick={() => setEditProjectModalOpen(false)}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editProjectTitle}
                    onChange={(e) => setEditProjectTitle(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter project title..."
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                    Project Description
                  </label>
                  <textarea
                    value={editProjectDescription}
                    onChange={(e) => setEditProjectDescription(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 h-32 resize-none"
                    placeholder="Enter project description..."
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Developers
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg p-3">
                    {teamMembers.map((member) => (
                      <label key={member.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded text-sm">
                        <input
                          type="checkbox"
                          checked={editSelectedDevelopers.includes(member.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditSelectedDevelopers(prev => [...prev, member.id]);
                            } else {
                              setEditSelectedDevelopers(prev => prev.filter(id => id !== member.id));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <img
                          src={member.image || '/placeholder-avatar.jpg'}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-white font-medium">{member.name}</span>
                          <span className="text-gray-400 text-sm ml-1">({member.role})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {editSelectedDevelopers.length > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Selected: {editSelectedDevelopers.length} developer{editSelectedDevelopers.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <span className="w-4 h-4 mr-2 text-gray-400">#</span>
                    Hashtags
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg p-3">
                    {defaultHashtags.map((hashtag) => (
                      <label key={hashtag} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded text-sm">
                        <input
                          type="checkbox"
                          checked={editSelectedHashtags.includes(hashtag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditSelectedHashtags(prev => [...prev, hashtag]);
                            } else {
                              setEditSelectedHashtags(prev => prev.filter(h => h !== hashtag));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-white font-medium text-sm">{hashtag}</span>
                      </label>
                    ))}
                  </div>
                  {editSelectedHashtags.length > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Selected: {editSelectedHashtags.length} hashtag{editSelectedHashtags.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Send className="w-4 h-4 mr-2 text-gray-400" />
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={editProjectLink}
                    onChange={(e) => setEditProjectLink(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="https://..."
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Image className="w-4 h-4 mr-2 text-gray-400" />
                    New Project Image (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        if (!file.type.startsWith('image/')) {
                          addNotification('Please select an image file', 'warning');
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          addNotification('File size must be less than 5MB', 'warning');
                          return;
                        }
                        setEditProjectImage(file);
                      }
                    }}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
                    accept="image/*"
                  />
                  {editProjectImage && (
                    <p className="text-sm text-gray-400 mt-1">
                      Selected: {editProjectImage.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setEditProjectModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Updating...' : 'Update Project'}
                  </button>
                </div>
              </form>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Replace Project Image Modal */}
      {replaceProjectImageModalOpen && replacingProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
          >
            <LiquidGlassCard
              shadowIntensity='md'
              borderRadius='16px'
              glowIntensity='sm'
              className="max-w-2xl w-full mx-4 p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Replace Project Image</h3>
                <button
                  onClick={() => setReplaceProjectImageModalOpen(false)}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">{replacingProject.title}</h4>
                <div className="relative">
                  <img
                    src={replacingProject.image || '/placeholder-project.jpg'}
                    alt={replacingProject.title}
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
                    <Image className="w-4 h-4 mr-2 text-gray-400" />
                    New Project Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        if (!file.type.startsWith('image/')) {
                          addNotification('Please select an image file', 'warning');
                          return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          addNotification('File size must be less than 5MB', 'warning');
                          return;
                        }
                        setNewProjectImageFile(file);
                      }
                    }}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
                    accept="image/*"
                  />
                  {newProjectImageFile && (
                    <p className="text-sm text-gray-400 mt-1">
                      Selected: {newProjectImageFile.name}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setReplaceProjectImageModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReplaceProjectImageSubmit}
                    disabled={!newProjectImageFile || uploading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Replacing...' : 'Replace Image'}
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Crop Modal */}
      {cropModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
          >
            <LiquidGlassCard
              shadowIntensity='md'
              borderRadius='16px'
              glowIntensity='sm'
              className="max-w-3xl w-full mx-4 p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Crop Image {currentImageIndex + 1} of {images.length}</h3>
                <button
                  onClick={() => setCropModalOpen(false)}
                  className="p-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden border border-gray-600">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-800 rounded-lg">
                <ZoomIn className="w-4 h-4 text-gray-400" />
                <label className="text-gray-300 font-medium text-sm">Zoom:</label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-300 min-w-[2.5rem] font-mono bg-gray-700 px-2 py-1 rounded text-xs">{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setCropModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Save Crop
                </button>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Add New Project Form */}
      <LiquidGlassCard
        shadowIntensity='md'
        borderRadius='16px'
        glowIntensity='sm'
        className="max-w-2xl mx-auto p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700 mb-12"
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Add New Project
          </h1>
          <p className="text-gray-400 text-sm">Create and publish your latest project</p>
        </motion.div>
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <FileText className="w-4 h-4 mr-2 text-gray-400" />
              Project Title
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
              placeholder="Enter project title..."
              required
            />
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <FileText className="w-4 h-4 mr-2 text-gray-400" />
              Project Description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 h-32 resize-none"
              placeholder="Enter project description..."
              required
            />
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <Image className="w-4 h-4 mr-2 text-gray-400" />
              Project Image
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  if (!file.type.startsWith('image/')) {
                    addNotification('Please select an image file', 'warning');
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    addNotification('File size must be less than 5MB', 'warning');
                    return;
                  }
                  setProjectImage(file);
                }
              }}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 transition-all duration-200"
              accept="image/*"
            />
            {projectImage && (
              <p className="text-sm text-gray-400 mt-1">
                Selected: {projectImage.name}
              </p>
            )}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              Developers
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg p-3">
              {teamMembers.map((member) => (
                <label key={member.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedDevelopers.includes(member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDevelopers(prev => [...prev, member.id]);
                      } else {
                        setSelectedDevelopers(prev => prev.filter(id => id !== member.id));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <img
                    src={member.image || '/placeholder-avatar.jpg'}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <span className="text-white font-medium">{member.name}</span>
                    <span className="text-gray-400 text-sm ml-2">({member.role})</span>
                  </div>
                </label>
              ))}
            </div>
            {selectedDevelopers.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Selected: {selectedDevelopers.length} developer{selectedDevelopers.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <span className="w-4 h-4 mr-2 text-gray-400">#</span>
              Hashtags
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg p-3">
              {defaultHashtags.map((hashtag) => (
                <label key={hashtag} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedHashtags.includes(hashtag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedHashtags(prev => [...prev, hashtag]);
                      } else {
                        setSelectedHashtags(prev => prev.filter(h => h !== hashtag));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white font-medium">{hashtag}</span>
                </label>
              ))}
            </div>
            {selectedHashtags.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Selected: {selectedHashtags.length} hashtag{selectedHashtags.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <label className="flex items-center text-sm font-medium mb-2 text-gray-300">
              <Send className="w-4 h-4 mr-2 text-gray-400" />
              Project Link (Optional)
            </label>
            <input
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
              placeholder="https://..."
            />
          </motion.div>
          <motion.button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Send className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Add Project'}
          </motion.button>
        </form>
      </LiquidGlassCard>

      {/* Existing Projects Management */}
      <LiquidGlassCard
        shadowIntensity='md'
        borderRadius='16px'
        glowIntensity='sm'
        className="max-w-6xl mx-auto p-6 text-white bg-black/90 backdrop-blur-md border border-gray-700"
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Manage Existing Projects
          </h2>
          <p className="text-gray-400 text-sm">Edit or delete your published projects</p>
        </motion.div>

        {loadingProjects ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading projects...</p>
          </div>
        ) : projectsList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {projectsList.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleProjectClick(project.id)}
                className="cursor-pointer"
              >
                <LiquidGlassCard
                  shadowIntensity='sm'
                  borderRadius='8px'
                  glowIntensity='xs'
                  className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-600 hover:border-gray-500 transition-all duration-200"
                >
                  <div className="relative h-20 overflow-hidden">
                    <img
                      src={project.image || '/placeholder-project.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-1 right-1 flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReplaceProjectImage(project);
                        }}
                        className="p-1 bg-green-600/80 hover:bg-green-600 text-white rounded transition-all duration-200"
                        title="Replace Image"
                      >
                        <Replace className="w-2.5 h-2.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                        className="p-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded transition-all duration-200"
                        title="Edit Project"
                      >
                        <Edit className="w-2.5 h-2.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                        className="p-1 bg-red-600/80 hover:bg-red-600 text-white rounded transition-all duration-200"
                        title="Delete Project"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white mb-1 text-sm line-clamp-1">{project.title}</h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex -space-x-2">
                        {(project.developer_ids || []).slice(0, 3).map((developerId: string) => {
                          const developer = teamMembers.find(m => m.id === developerId);
                          return developer ? (
                            <img
                              key={developerId}
                              src={developer.image || '/placeholder-avatar.jpg'}
                              alt={developer.name}
                              className="w-4 h-4 rounded-full object-cover border border-gray-600"
                              title={developer.name}
                            />
                          ) : null;
                        })}
                        {(project.developer_ids || []).length > 3 && (
                          <div className="w-4 h-4 rounded-full bg-gray-600 border border-gray-600 flex items-center justify-center text-xs text-white">
                            +{(project.developer_ids || []).length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 truncate">
                        {(project.developer_ids || []).length === 1
                          ? teamMembers.find(m => m.id === (project.developer_ids || [])[0])?.name
                          : `${(project.developer_ids || []).length} developers`
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(project.created_at).toLocaleDateString()}</span>
                      {project.link && <span className="text-blue-400">Link</span>}
                    </div>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </LiquidGlassCard>

      {/* Custom Notifications */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notification) => {
            const getIcon = () => {
              switch (notification.type) {
                case 'success':
                  return <CheckCircle className="w-5 h-5 text-green-400" />;
                case 'error':
                  return <AlertCircle className="w-5 h-5 text-red-400" />;
                case 'warning':
                  return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
                default:
                  return <Info className="w-5 h-5 text-blue-400" />;
              }
            };

            const getBgColor = () => {
              switch (notification.type) {
                case 'success':
                  return 'bg-green-500/20 border-green-500/40';
                case 'error':
                  return 'bg-red-500/20 border-red-500/40';
                case 'warning':
                  return 'bg-yellow-500/20 border-yellow-500/40';
                default:
                  return 'bg-blue-500/20 border-blue-500/40';
              }
            };

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300, scale: 0.3 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-full p-4 rounded-lg border backdrop-blur-md ${getBgColor()} shadow-xl border-2`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-white/20 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-gray-300 hover:text-white" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;