import * as THREE from "three";
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Lesson1 {
    constructor(element, {
        x,
        y,
        z
    }) {
        this.htmlElement = element;
        this.w = element.clientWidth;
        this.h = element.clientHeight;
        // 场景
        this.scene = new THREE.Scene();
        // 摄像机
        this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 0.1, 1000);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.w, this.h);
        this.htmlElement.appendChild(this.renderer.domElement);
        // 几何体
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        // 材质
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        // 图形
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera.position.x = x || 0;
        this.camera.position.y = y || 0;
        this.camera.position.z = z || 0;
    }
    init() {
        this.scene.add(this.cube);
        // 添加轨道控制器
        this.controler = new OrbitControls(this.camera, this.renderer.domElement);
        this.animation();
    }
    animation() {
        requestAnimationFrame(() => {
            this.animation()    
        })
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
    // 更新摄像机位置
    updateProjectionMatrix(x, y, z) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
        this.camera.updateProjectionMatrix();
    }
}