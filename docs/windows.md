###windows������sudo������

    runas /user:user_name program.exe

>user_name��Ҫʹ���ĸ��û����иó����д���ĸ��û�����program.exe�ǳ����������program.exe����system32Ŀ¼�µĻ�����Ҫָ������·����


###npm -g ��װ��module�޷�require��
####����һ
�ҵĵ���->����-> �߼�-> ��������, ���һ������������Ϊ NODE_PATH , ����ֵ����Ϊȫ��ģ��ĸ�Ŀ¼.

    C:\Program Files\nodejs\node_modules

####������
��Ҫȥ�� NODE_PATH��npm install -g �Ҳ����������ġ�������Ҫ babel ��Ŀ¼ִ�� npm link babel���ֶ��ø�Ŀ¼�µ��ļ������ҵ� babel��

    npm link babel
    W:\workspace\IACG\node_modules\babel -> C:\Users\zodaic\AppData\Roaming\npm\node_modules\babel

>�����Ҫrequireȫ�ְ���������npm link��local��



###windows���޷���װn �л���iojs

������Ŀʹ��node --harmony index.js  ��������nodemon����



