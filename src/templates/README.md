# 使用方法

由于需要将 ejs 用于实时展示，因此，script 需要单独提出来做整合

之后再

eval —— 当前平台

集成 —— 后端平台

所以，凡是 script 中需要配置变量的，通过 ejs 的模板部分配置

具体做法是：

xxx.ejs

```HTML
<div data-test="<?= test =>" class="component-xxx">xxx</div>
```

xxx.script.ejs

```HTML
<script>
    const test = document.querySelector('.component-xxx').dataset.test
</script>
```

注意：

** 模板中不要出现 id 选择符，用 class + querySelector 代替 **
