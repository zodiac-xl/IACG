###一、层叠等级

* 原则一：继承不如指定
* 原则二：#id>.class>标签选择器
* 原则三：越具体越强大
* 原则四：标签#id>#id; 标签.class>.class
* 原则五：原则一>原则二>原则三>原则四

###二、:checked选择器范围

* 熟知的 :checked会选择被选中的checkbox radio
* 不常见的 option被选择也会应用:checked

###三、并不是所有的图片都会被加载

* 写在页面上的img标签，无论显示与否，图片都会被加载

* 而使用backgroung-image等css属性为页面添加图片，这些图片不是一定会被加载。
* 没有用到的CSS和父容器的display被设为none的情况，这两种情况下的CSS引用的图片是不会被加载的，而父容器设置visibility属性为hidden仍然会加载图片
