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
    // 摄像机，参数（视角、宽高、近裁面、远裁面）
    this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 0.1, 1000);
    this.camera.position.x = x || 0;
    this.camera.position.y = y || 0;
    this.camera.position.z = z || 0;
    // 渲染器
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.w, this.h);
    this.htmlElement.appendChild(this.renderer.domElement);

    /*
     * 鼠标绘制对象相关变量
     */
    this.drawingState = 0; // 0: 未绘制矩形, 1: 绘制矩形, 2: 设置高度
    // 绘制完成后的矩形
    this.rectangle = null;
    // 鼠标
    this.mouse = new THREE.Vector2();
    // 位置、高度(立方体的三个顶点)
    this.startPosition = null;
    this.endPosition = null;
    this.zPosition = null;

    // PCD模型加载
    this.pcdLoader = new PCDLoader(); // 加载器
    // 9.添加辅助坐标系
    // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴 -- R G B
    // AxesHelper( size : Number ) size -- (可选的) 表示代表轴的线段长度. 默认为 1.
    const axesHelper = new THREE.AxesHelper(50);
    this.scene.add(axesHelper);
  }
  async init(path) {
    // 加载PCD模型
    this.pcdLoader.load(path, (geometry) => {
      // 延z轴旋转90度, 初始化PCD高度、位置等
      geometry.geometry.rotateZ(0.5 * Math.PI);//旋转模型，可调
      const middle = new THREE.Vector3();
      geometry.material.color = new THREE.Color(0xffff00); // 模型颜色
      this.scene.add(geometry);
      geometry.geometry.computeBoundingBox();
      geometry.geometry.boundingBox.getCenter(middle);
      this.pcd_height = 100;
      this.camera.position.z = this.pcd_height; //相机位置，可调
    });

    // 添加轨道控制器
    this.controler = new OrbitControls(this.camera, this.renderer.domElement);
    this.controler.enableDamping = true;
    this.controler.enabled = true;
    this.animation();

    // 鼠标事件添加
    this.initMouseEvent();
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
  // 初始化鼠标事件
  initMouseEvent() {
    this.htmlElement.addEventListener("click", this.handlerClickEvent.bind(this));
    this.htmlElement.addEventListener("mousemove", this.handlerMoveEvent.bind(this));
  }
  handlerClickEvent(event) {
    console.log('点击');
    event.preventDefault();
    if (this.drawingState === 0) {
      // 开始绘制矩形中
      console.log("开始绘制矩形");
      this.drawingState = 1;
      this.drawCube(event, "stage1");
    } else if (this.drawingState === 1) {
      // 绘制矩形结束，开始设置立方体高度
      console.log("绘制平面矩形完成");
      this.drawingState = 2;
      this.drawCube(event, "stage3");
    } else {
      // 设置立方体高度
      console.log("设置高度完成，绘制完成");
      this.drawingState = 0;
      this.drawCube(event, "stage5");
    }
  }
  handlerMoveEvent(event) {
    if (this.drawingState === 1) {
      // 正在绘制矩形
      console.log("绘制平面矩形");
      this.drawCube(event, "stage2");
    } else if (this.drawingState === 2) {
      // 设置立方体高度
      console.log("设置立方体高度");
      this.drawCube(event, "stage4");
    } else {
      // 无效移动
      console.log("无效移动");
    }
  }
  // 移除鼠标事件
  removeMouseEvent() {
    console.log('注销鼠标事件', this.htmlElement);
    this.htmlElement.removeEventListener("click", this.handlerClickEvent.bind(this), false);
    this.htmlElement.removeEventListener("mousemove", this.handlerMoveEvent.bind(this), false);
  }
  // 通过鼠标事件画出立方体，绘制过程drawingState应该是 click => mousemove => click => mousemove => click
  drawCube(event, stage) {
    if (stage === "stage1") {
      this.startPosition = this.getWorldPosition(event);
    } else if (stage === "stage2" || stage === "stage3") {
      // 鼠标再次点击，完成矩形创建，开始变换为立方体
      this.endPosition = this.getWorldPosition(event);
      this.redraw();
    } else if (stage === "stage4" || stage === "stage5") {
      // 鼠标移动，计算z值大小，动态设置立方体高度
      this.zPosition = this.getWorldPosition(event);
      // 以endPosition跟zPosition的Y值差为立方体高度
      this.redraw(this.zPosition);
      if (stage === "stage5") {
        // 绘制完成，移除鼠标事件
        setTimeout(() => {
          this.removeMouseEvent();
        }, 0);
      }
    }
  }
  // 通过传入鼠标事件，获取世界坐标
  getWorldPosition(event) {
    // 鼠标事件的clientX和clientY属性返回鼠标相对于浏览器窗口的坐标
    // 而我们需要的是相对于canvas的坐标
    // 所以需要将clientX和clientY转换为相对于canvas的坐标
    // 我们可以通过canvas的getBoundingClientRect()方法来获取canvas相对于浏览器窗口的坐标  
    const mouse = new THREE.Vector2();
    const boundingBox = this.htmlElement.getBoundingClientRect();
    // 鼠标点击位置
    // 计算鼠标点击位置，（归一化坐标系，其值在[-1, 1]之间）
    mouse.x = ((event.clientX - boundingBox.left) / boundingBox.width) * 2 - 1;
    mouse.y = -((event.clientY - boundingBox.top) / boundingBox.height) * 2 + 1;
    // 屏幕坐标转换为三维坐标
    const screenPosition = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    const worldPosition = new THREE.Vector3(); // 世界坐标
    screenPosition.unproject(this.camera); // 将屏幕坐标反投影到世界坐标
    screenPosition.sub(this.camera.position).normalize(); // 获取方向向量
    const distance = -this.camera.position.z / screenPosition.z; // 计算距离
    worldPosition.copy(this.camera.position).add(screenPosition.multiplyScalar(distance)); // 计算世界坐标
    return worldPosition.clone()
  }
  // 重绘
  redraw(zPosition) {
    let z;
    if(zPosition) {
      // 计算z值
      z = this.zPosition.y - this.endPosition.y;
    }
    const k_x = (this.startPosition.x - this.endPosition.x)/2;
    const k_y = (this.startPosition.y - this.endPosition.y)/2;
    const k_z = z || 0;
    this.scene.remove(this.rectangle);
    const geometry_k = new THREE.BoxGeometry(k_x, k_y, k_z);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.3,
      transparent: true,
    });
    this.rectangle = new THREE.Mesh(geometry_k, material);
    this.rectangle.position.x = this.startPosition.x;
    this.rectangle.position.y = this.startPosition.y;
    this.rectangle.position.z = this.startPosition.z;
    this.scene.add(this.rectangle);
    const edges = new THREE.EdgesGeometry(geometry_k); // 创建立方体边缘几何体
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // 创建边缘材质
    const edgesLines = new THREE.LineSegments(edges, edgesMaterial); // 创建边缘高亮线条对象
    this.rectangle.add(edgesLines); // 将边缘高亮线条添加到立方体上
    this.renderer.render(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera);
  }
}
