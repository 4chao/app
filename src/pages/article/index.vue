<template>
  <meta hide />
  <sys>
    <template #fixed>
      <Toolbar @new-paragraph="groups.push({ paragraph: [{ new: true }] })"></Toolbar>
    </template>
    <div flex-center>
      <div pxy>
        <div i-ri-arrow-left-line></div>
      </div>
      <div flex-1></div>
      <div pxy text-xs text-gray>{{ autoSaveStatus }}</div>
      <div pxy>
        <div i-ri-menu-line></div>
      </div>
    </div>
    <div pxy mb>
      <textarea v-model="base.title" auto-height placeholder="请输入标题" class="textarea" maxlength="400" placeholder-style="color: #D5D5E0;" />
      <Contenteditable v-model="base.description" placeholder="添加描述" text-32 />
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
import { PageArticle } from '@/types'
import { debounce, merge } from 'lodash'

// ==================== 基础信息 ====================
const { params } = $(useQuery<PageArticle>())
const baseOriginal = reactive<Partial<ProjectDto>>({})
const baseEdited = reactive<Partial<ProjectDto>>({})
const base = new Proxy(baseEdited, {
  get: (target, key) => target[key] || baseOriginal[key],
  set: (target, key, value) => !void (target[key] = value),
})

// ==================== 页面加载 ====================
useScroll(onPageScroll).onLoad(async () => {
  const { id } = await use(() => params)
  console.log('初始化:', id)
  merge(baseOriginal, id ? await api.getProject({ id }) : {})
  console.log(baseOriginal)
})

// ==================== 自动保存 ====================
let autoSaveStatus = $ref('')

async function autoSaveRun() {
  autoSaveStatus = '自动保存中...'
  // await api.updateProject({ ...baseEdited, id: params.id })
  await new Promise(resolve => setTimeout(resolve, 500))
  autoSaveStatus = '自动保存成功'
}
// 内容修改 1s 后自动保存, 最多等待五秒
watch(baseEdited, debounce(autoSaveRun, 1000, { maxWait: 5000 }), { deep: true })

// ==================== 分组 ====================
// WIP...
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
