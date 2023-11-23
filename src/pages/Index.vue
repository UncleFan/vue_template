<!--
 * @Description: 
 * @Date: 2021-06-04 09:42:10
 * @page: 
-->
<template>
  <div class="wrap">
    <el-row class="header">
      <el-col :span="3" class="logo-wrap">
        <svg-icon class="logo" icon-class="logo"></svg-icon>
      </el-col>
      <el-col :span="21" class="tools-wrap">
        <div :span="2" class="block">
          <span class="tool">
            <svg-icon icon-class="cancel"></svg-icon>
            <span>撤销</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="redo"></svg-icon>
            <span>重做</span>
          </span>
        </div>
        <div :span="4" class="block">
          <span class="tool">
            <svg-icon icon-class="copy"></svg-icon>
            <span>复制</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="delete"></svg-icon>
            <span>删除</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="empty"></svg-icon>
            <span>清空</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="save"></svg-icon>
            <span>保存</span>
          </span>
        </div>
        <div :span="1" class="block">
          <span class="tool">
            <svg-icon icon-class="census"></svg-icon>
            <span>统计</span>
          </span>
        </div>
        <div :span="2" class="block">
          <span class="tool">
            <svg-icon icon-class="help"></svg-icon>
            <span>帮助</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="settings"></svg-icon>
            <span>设置</span>
          </span>
        </div>
        <div :span="3" class="block">
          <span class="tool">倒计时 20:00</span>
          <span class="line"></span>
          <span class="tool">已完成 223</span>
          <span class="line"></span>
          <span class="tool">已进行 123</span>
        </div>
        <div :span="3" class="block right">
          <span class="tool">
            <svg-icon icon-class="records"></svg-icon>
            <span>审核记录</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="collect"></svg-icon>
            <span>收藏</span>
          </span>
          <span class="line"></span>
          <span class="tool">
            <svg-icon icon-class="full_screen"></svg-icon>
            <span>全屏</span>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row span="24" style="display: flex;gap: 4px;">
      <el-col :span="1">
        <div class="icons">
          <svg-icon
            class="icon"
            :icon-class="active === 1 ? 'arrow_active' : 'arrow'"
            @click.stop="active = 1"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 2 ? 'transform_active' : 'transform'"
            @click.stop="active = 2"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 3 ? 'scale_active' : 'scale'"
            @click.stop="active = 3"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 4 ? 'rotation_active' : 'rotation'"
            @click.stop="active = 4"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 5 ? 'rules_active' : 'rules'"
            @click.stop="active = 5"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 6 ? 'roop_active' : 'roop'"
            @click.stop="active = 6"
          ></svg-icon>
          <svg-icon
            class="icon"
            :icon-class="active === 7 ? 'ai_active' : 'ai'"
            @click.stop="active = 7"
          ></svg-icon>
        </div>
      </el-col>
      <!-- 主界面 -->
      <el-col :span="18" class="three">
        <el-row :gutter="4" class="three-main">
          <el-col :span="14">
            <div class="views">
                <!-- <el-button size="mini" @click.stop="controlOrbits()">轨道控制：{{ forbiddenOrbit? '开' : '关' }}</el-button> -->
              <div class="title"><span>主视图</span></div>
              <div id="three"></div>
            </div>
          </el-col>
          <!-- 三视图 -->
          <el-col :span="10" class="sideviews">
            <div class="views">
              <div class="title">顶视图</div>
              <div id="top"></div>
            </div>
            <div class="views">
              <div class="title">正视图</div>
              <div id="right"></div>
            </div>
            <div class="views">
              <div class="title">左视图</div>
              <div id="left"></div>
            </div>
          </el-col>
        </el-row>
        <!-- 底部工具栏 -->
        <el-row class="three-tools">
          <el-col :span="24" class="bottomTools">
            <span style="color: #C9CDD4">当前帧：16</span>
            <span class="controls">
              <svg-icon icon-class="prevx3"></svg-icon>
              <svg-icon icon-class="prevx2"></svg-icon>
              <svg-icon icon-class="prevx1"></svg-icon>
              <svg-icon icon-class="prev"></svg-icon>
              <svg-icon icon-class="next"></svg-icon>
              <svg-icon icon-class="nextx1"></svg-icon>
              <svg-icon icon-class="nextx2"></svg-icon>
              <svg-icon icon-class="nextx3"></svg-icon>
            </span>
            <span class="btn">
              <span>单帧无效</span>
              <span>所有帧无效</span>
            </span>
          </el-col>
          <el-col :span="24">
            <div class="keyframes">
              <span
                v-for="i in 37"
                :key="i"
                class="keyframe"
                :class="{ active: i === activeFrame ? 'active' : '' }"
                @click="setActiveKey(i)"
                >{{ i }}</span
              >
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右侧对象区域 -->
      <el-col :span="5" class="objects">
        <div class="object">
            <p class="object_title"><i class="el-icon-d-arrow-left"></i><span>标注方案</span></p>
            <el-tabs v-model="activeTab" stretch @tab-click="handleTabClick">
                <el-tab-pane label="个体分类" name="unit">
                    <div class="labels">
                        <span>工具</span>
                        <span>颜色</span>
                        <span>快捷键</span>
                        <span>个体分类类目</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_01"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_01"></svg-icon></span>
                        <span class="shortcut">CTRL + 1</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_02"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_02"></svg-icon></span>
                        <span class="shortcut">CTRL + 2</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_03"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_03"></svg-icon></span>
                        <span class="shortcut">CTRL + 3</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_04"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_04"></svg-icon></span>
                        <span class="shortcut">CTRL + 4</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_05"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_05"></svg-icon></span>
                        <span class="shortcut">CTRL + 5</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_06"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_06"></svg-icon></span>
                        <span class="shortcut">CTRL + 6</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_07"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_07"></svg-icon></span>
                        <span class="shortcut">CTRL + 7</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                    <div class="labels">
                        <span><svg-icon icon-class="tool_08"></svg-icon></span>
                        <span><svg-icon icon-class="tool_color_08"></svg-icon></span>
                        <span class="shortcut">CTRL + 8</span>
                        <span>驾驶员在前框左侧</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="全局分类" name="global">全局分类</el-tab-pane>
                <el-tab-pane label="标注历史" name="history">标注历史</el-tab-pane>
            </el-tabs>
        </div>
        <div class="submit">
            <span>确认完成加载下一条</span>
            <span class="submitBtn">
                <svg-icon icon-class="subcheck"></svg-icon>
                <span>提交</span>
            </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SvgIcon from "@/pages/components/SvgIcon";
import Lesson1 from "./components/three/lesson1";
export default {
  components: {
    SvgIcon,
  },
  name: "Index",
  data() {
    return {
      active: 1,
      activeFrame: 1, // 选中的帧
      activeTab: "unit",
      x: 1,
      y: 1,
      z: 5,
      threePlus: null, // 主视图
      topPlus: null, // 顶部视图
      leftPlus: null, // 左视图
      rightPlus: null, // 正视图
      w: null,
      h: null,
      tabData: [
        {
            tool: "#3382FF",
            color: "#3382FF",
            shortcut: "Ctrl+1",
            unitclass: "驾驶员在前框左侧"
        }
      ],
      // 禁用轨道器
      forbiddenOrbit: true
    };
  },
  mounted() {
    const _three = document.getElementById("three");
    const _top = document.getElementById("top");
    const _left = document.getElementById("left");
    const _right = document.getElementById("right");
    this.threePlus = new Lesson1(_three, {
      x: 0,
      y: 0,
      z: 100,
    });
    this.topPlus = new Lesson1(_top, {
      x: 0,
      y: 0,
      z: 100,
    });
    this.leftPlus = new Lesson1(_left, {
      x: -100,
      y: 100,
      z: 0,
    });
    this.rightPlus = new Lesson1(_right, {
      x: 100,
      y: 0,
      z: 0,
    });
    this.threePlus.init("Zaghetto.pcd");
    this.topPlus.init("Zaghetto.pcd");
    this.leftPlus.init("Zaghetto.pcd");
    this.rightPlus.init("Zaghetto.pcd");
  },
  methods: {
    save() {
      // 更新camera坐标
      this.threePlus.updateProjectionMatrix(this.x, this.y, this.z);
    },
    setActiveKey(i) {
        this.activeFrame = i;
    },
    handleTabClick(tab) {
        this.activeTab = tab.name;
    },
    controlOrbits() {
        // this.forbiddenOrbit = !this.forbiddenOrbit;
        this.threePlus.controlOrbitControls(this.forbiddenOrbit)
    }
  },
};
</script>

<style scoped>
p {
    margin: 0;
}
.wrap {
  width: 100vw;
  height: 100vh;
  background-color: #151617;
}
.main {
  width: 100%;
  height: calc(100vh - 92px - 140px);
  overflow: hidden;
}
.three {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 92px);
  justify-content: space-between;
}
#three {
  width: 100%;
  /* 计算方式：100vh - 顶部操作栏 - 底部操作栏 - 小标题 */
  height: calc(100vh - 92px - 140px - 32px);
}
#top,
#left,
#right {
  height: calc((100vh - 92px - 140px - 32px - 8px - (32px * 3) + 4px) / 3);
}
.bottomTools {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.icons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-radius: 4px;
  background: #303234;
}
.icon {
  font-size: 36px;
  cursor: pointer;
}
.logo-wrap {
  height: 68px;
  position: relative;
  padding: 0 50px;
}
.logo {
  display: block;
  font-size: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header {
  overflow: hidden;
  margin-bottom: 6px;
  padding-top: 6px;
  padding-right: 12px;
}
.block {
  padding: 0 6px;
  display: flex;
  align-items: center;
  color: #c9cdd4;
  border-radius: 4px;
  background: #303234;
}
.tools-wrap {
  display: flex;
  gap: 12px;
}
.tool {
  padding: 0 12px;
  height: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  box-sizing: border-box;
}
.line {
  width: 1px;
  height: 26px;
  background-color: #18191c;
  display: block;
}
.block.right {
  margin-left: auto;
}
.title {
  width: 80px;
  height: 32px;
  color: #86909c;
  border-radius: 4px;
  border: 1px solid #434547;
  background: #2a2c2e;
  margin-left: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  line-height: 32px;
  transform: translateX(-5px);
}
.views {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #434547;
  overflow: hidden;
  box-sizing: border-box;
}
.sideviews {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sideviews > .views {
  flex: 1;
}
.three-main {
  height: calc(100vh - 92px - 140px);
}
.three-tools {
  height: 120px;
  border-radius: 4px;
  background: #303234;
  padding: 0 10px;
  box-sizing: border-box;
}
.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}
.btn {
  margin-left: auto;
  display: flex;
  gap: 10px;
}
.btn > span {
  border-radius: 4px;
  background: #242527;
  color: #c9cdd4;
  padding: 5px 15px;
}
.keyframes {
  height: 60px;
  display: flex;
  padding: 2px;
  background: #1f2123;
  gap: 2px;
  padding-bottom: 2px;
}
.keyframe {
  flex: 1;
  border-radius: 2px;
  background: #303234;
  transition: all .2s linear;
  cursor: pointer;
  color: #86909C;
}
.keyframe.active {
    background: #3382FF;
    color: #FFF;
    font-weight: 500;
}
.objects {
    height: calc(100vh - 92px);
}
.object {
    height: calc(100vh - 92px - 71px);
    border-radius: 4px 0px 0px 4px;
    background: #303234;
}
.submit {
    margin-top: 6px;
    height: 65px;
    display: flex;
    gap: 12px;
    background-color: #303234;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
}
.submit>span {
    flex: 1;
    line-height: calc(65px - 24px);
    border-radius: 4px;
    background: #242527;
    color: #FFF;
    font-size: 12px;
}
.submit .submitBtn {
    background-color: #3382FF;
}
.object_title {
    color: #FFF;
    text-align: left;
    padding: 12px;
}
.object_title > span {
    margin-left: 10px;
}
.labels {
    display: flex;
    padding: 5px 0;
}
.labels > span {
    line-height: 24px;
    width: 15%;
    color: #FFF;
    font-size: 12px;
}
.labels > .shortcut {
    border-radius: 4px;
    border: 1px solid #151617;
    background: #242527;
    line-height: 24px;
}
.labels:nth-child(even) {
    background: #282A2D;
}
.labels > span:nth-last-child(1) {
    width: 40%;
}
.labels > span:nth-last-child(2) {
    width: 30%;
}
::v-deep .el-tabs__item {
    color: #C9CDD4;
}
</style>
