###windows下类似sudo的命令

    runas /user:user_name program.exe

>user_name是要使用哪个用户运行该程序就写上哪个用户名，program.exe是程序名，如果program.exe不在system32目录下的话，需要指明具体路径。


###npm -g 安装的module无法require？
####方法一
我的电脑->属性-> 高级-> 环境变量, 添加一个环境变量名为 NODE_PATH , 将其值设置为全局模块的根目录.

    C:\Program Files\nodejs\node_modules

####方法二
不要去改 NODE_PATH，npm install -g 找不到是正常的。在你需要 babel 的目录执行 npm link babel，手动让该目录下的文件可以找到 babel。

    npm link babel
    W:\workspace\IACG\node_modules\babel -> C:\Users\zodaic\AppData\Roaming\npm\node_modules\babel

>如果需要require全局包，可以先npm link到local。



###windows下无法安装n 切换到iojs

启动项目使用node --harmony index.js  而不是用nodemon启动



