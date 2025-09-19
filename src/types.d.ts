// Type definitions for ogl
declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: WebGLRenderingContext;
    setSize(width: number, height: number): void;
    render(options: { scene: any; camera?: any }): void;
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: any);
    uniforms: any;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: any);
    setParent(parent: any): void;
    program: Program;
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Vec2 {
    constructor(x?: number, y?: number);
    set(x: number, y: number): void;
  }

  export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): void;
    x: number;
    y: number;
    z: number;
    copy(v: Vec3): Vec3;
    add(v: Vec3): Vec3;
    sub(v: Vec3): Vec3;
    multiply(s: number): Vec3;
    lerp(v: Vec3, t: number): Vec3;
  }

  export class Transform {
    constructor();
    position: { z: number };
  }

  export class Camera {
    constructor(gl: WebGLRenderingContext, options?: any);
    position: { z: number };
  }

  export class Color {
    constructor(r?: number | string, g?: number, b?: number);
  }

  export class Polyline {
    constructor(gl: WebGLRenderingContext, options?: any);
    mesh: Mesh;
    resize(): void;
    updateGeometry(): void;
  }
}

// Type definitions for image files
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}