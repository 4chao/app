# 编写你的一个组件

组件目录存放在 D4C 中，里面有 components(组件)、hooks、theme-default(样式)、utils(公共方法)

## 创建组件

通过命令行创建组件

```bash
yarn ct '组件名称'
```

此命令会在 components、example、docs/components 中创建组件和示例代码以及组件 Markdown

::: warning 生成的组件 Markdown 不会自动在 sidebar 和 nav 添加配置，需要自行 navigation 添加配置 :::
