import * as THREE from "three";
// 引入PCD加载器
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";
// 引入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class Lesson1 {
  constructor(element, { x, y, z }) {
    this.htmlElement = element;
    this.w = this.htmlElement.clientWidth;
    this.h = this.htmlElement.clientHeight;
    // 场景
    this.scene = new THREE.Scene();
    // 摄像机
    this.camera = new THREE.PerspectiveCamera(120, this.w / this.h, 0.1, 10000);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.w, this.h);
    this.htmlElement.appendChild(this.renderer.domElement);
    // 几何体
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    // PCD模型加载
    this.pcdLoader = new PCDLoader(); // 加载器
    // 图形
    // this.cube = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.cube);
    this.camera.position.x = x || 0;
    this.camera.position.y = y || 0;
    this.camera.position.z = z || 0;
    // 9.添加辅助坐标系
    // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴 -- R G B
    // AxesHelper( size : Number ) size -- (可选的) 表示代表轴的线段长度. 默认为 1.
    const axesHelper = new THREE.AxesHelper(50);
    this.scene.add(axesHelper);
  }
  async init(path) {
    // 加载PCD模型
    this.pcdLoader.load(path, (geometry) => {
      geometry.material.color = new THREE.Color(0xffff00); // 模型颜色
      this.scene.add(geometry);
    });
    // 添加轨道控制器
    this.controler = new OrbitControls(this.camera, this.renderer.domElement);
    this.controler.enableDamping = true;
    this.controler.enabled = true;
    this.animation();
    // 事件添加
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector3();
    // let drawingState = 0; // 0: 未绘制矩形, 1: 绘制矩形, 2: 设置高度
    // let startPosition, endPosition, height;
    // // 添加鼠标点击事件监听器
    // window.addEventListener("click", (event) => {
    //   onClick(event, this);
    // });
    // // 鼠标点击事件处理函数
    // function onClick(event, that) {
    //   console.log(event);
    //   event.preventDefault();
    //   // 计算鼠标点击位置
    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //   // 更新射线
    //   raycaster.setFromCamera(mouse, that.camera);

    //   // 获取射线与场景中物体的交叉点
    //   const intersects = raycaster.intersectObjects(that.scene.children);

    //   if (intersects.length > 0) {
    //     const intersect = intersects[0].point;

    //     // 根据当前绘制状态进行操作
    //     if (drawingState === 0) {
    //       startPosition = intersect;
    //       drawingState = 1;
    //     } else if (drawingState === 1) {
    //       endPosition = intersect;
    //       drawingState = 2;

    //       // 计算矩形尺寸
    //       const width = Math.abs(endPosition.x - startPosition.x);
    //       const depth = Math.abs(endPosition.z - startPosition.z);

    //       // 创建矩形
    //       const geometry = new THREE.BoxGeometry(width, height || 1, depth);
    //       const material = new THREE.MeshBasicMaterial({
    //         color: 0xff0000,
    //         transparent: true,
    //         opacity: 0.7,
    //       });
    //       const rectangle = new THREE.Mesh(geometry, material);

    //       // 设置矩形位置
    //       rectangle.position.set(
    //         (startPosition.x + endPosition.x) / 2,
    //         height / 2 || 0.5,
    //         (startPosition.z + endPosition.z) / 2
    //       );

    //       // 将矩形添加到场景中
    //       that.scene.add(rectangle);
    //     } else if (drawingState === 2) {
    //       height = Math.abs(intersect.z);
    //       drawingState = 0;
    //     }
    //   }
    // }
    window.addEventListener("mousedown", event => {
      // 计算当前位置点
      event.preventDefault();
      console.log(event);
    })
  }
  animation() {
    requestAnimationFrame(() => {
      this.animation();
    });
    this.renderer.render(this.scene, this.camera);
  }
  // 更新摄像机位置
  updateProjectionMatrix(x, y, z) {
    this.controler.update();
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
    this.camera.updateProjectionMatrix();
  }
  // 是否可操作轨道器
  controlOrbitControls(boolean) {
    this.controler.enabled = boolean;
    this.controler.update();
  }
  // 通过鼠标事件画出立方体
  
}
