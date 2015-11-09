# baidu-push-phonegap-plugin 111
# 百度推送的phonegap插件
# 使用
1，拷贝src www文件夹，package.json plugin.xml文件，到com.cmpsoft.mobile.plugin.pushnotification文件夹

2，拷贝com.cmpsoft.mobile.plugin.pushnotification文件夹到cordova项目的plugins文件夹

3，修改plugin.xml文件中的api_key的value值为自己应用的

3，cordova platforms add android 添加安卓环境

4，cordova build android 生成apk


# 说明
1，参考自 极光推送插件 https://github.com/jpush/jpush-phonegap-plugin（广播接收器处理消息部分）
          
          另一个插件 https://github.com/linglong117/com.cmpsoft.mobile.plugin.pushnotification（初始化注册，接收消息部分）

2，暂时只有针对android设备的插件

3，针对百度推送最新的sdk4.5.1.8写的插件，之前的sdk可能没有接收消息的广播接收器

4，demo目录下是带百度推送插件的cordova项目

5，代码执行的主要流程

（1）注册待推送设备到百度推送

     index.html的fastgoPushNotification.init("api_key"); 方法执行，

     跳转到PushNotification.js的FGPushNotification.prototype.init = function(api_key)方法执行，
     
     跳转到PushNotification.java的PushManager.startWork(cordova.getActivity().getApplicationContext(), 0, args.getString(0));方法执行
     
     注册成功
     
（2）配置文件填写自己的api_key <meta-data android:name="api_key" android:value="api_key" /> 即可收到自己发送的消息

（3）广播接收器处理消息

     MyPushMessageReceiver的transmitOpen方法传递通知数据给PushNotification.java
     
     PushNotification.java的instance.webView.sendJavascript(js);方法传递数据给PushNotification.js
     
     PushNotification.js的FGPushNotification.prototype.openNotificationInAndroidCallback方法接收数据
     
     通过启动在index.html注册的监听cordova.fireDocumentEvent('bpush.openNotification',data);和全局的插件变量fastgoPushNotification
     传递数据给index.html
     
（4）关于传递的数据
     
     title：通知标题
     
     description：通知内容
     
     value：自定义键值对的值（在发送通知推送的高级设置中，自定义设置的键在MyPushMessageReceiver的onNotificationClicked方法中）
