<template>
  <meta hide />
  <sys>
    <template #fixed>
      <Toolbar @new-paragraph="groups.push({ paragraph: [{ new: true }] })"></Toolbar>
    </template>
    <div flex-center>
      <div pxy><div i-ri-arrow-left-line></div></div>
      <div flex-1></div>
      <div pxy text-xs text-gray>自动保存成功</div>
      <div pxy><div i-ri-menu-line></div></div>
    </div>
    <div pxy mb>
      <textarea auto-height placeholder="请输入标题" class="textarea" maxlength="400" placeholder-style="color: #D5D5E0;" />
      <div relative>
        <div
          v-if="!addDiscription && !discription"
          absolute
          inset-0
          flex-center
          justify-start
          text-gray
          bg-white
          z-100
          @click="addDiscription = true"
        >
          <div i-ri-ball-pen-fill></div>
          <div mlxs>添加描述</div>
        </div>
        <textarea v-model="discription" auto-height :focus="addDiscription" @blur="addDiscription = false" @focus="addDiscription = true" />
      </div>
    </div>
    <div v-if="!groups.length" mtxl p60>
      <div class="empty-target" flex-center>
        <Droppable id="empty-target" class="empty-target-dropbox" flex-center>
          <template #normal>
            <div text-bluegray>将</div>
            <div class="fab" transform-scale-50 m--15>
              <div i-fluent-add-28-regular w70 h70></div>
            </div>
            <div text-bluegray>拖拽到此处, 添加你的第一个段落</div>
          </template>
          <template #active>
            <div text-bluegray>在此释放, 添加你的第一个段落</div>
          </template>
        </Droppable>
      </div>
    </div>
    <Group v-for="(group, i) in groups" :key="i" :context="group"></Group>
  </sys>
</template>

<script setup lang="ts">
import Toolbar from './components/Toolbar.vue'
import Group from './components/Group.vue'

let addDiscription = $ref(false)
let discription = $ref('')

const groups = reactive([])
</script>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  font-size: 72rpx;
  line-height: 1.5;
  font-weight: bold;
}

.empty-target {
  border: 6rpx dashed #e8e8e8;
  border-radius: 20rpx;
  width: 630rpx;
  height: 324rpx;
}

.empty-target-dropbox {
  width: 580rpx;
  height: 274rpx;
  border-radius: 10rpx;
}

.fab {
  width: 100rpx;
  height: 100rpx;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  @apply bg-brand-pri text-white;
  @apply rounded-full;
  @apply flex-center;
}
</style>
