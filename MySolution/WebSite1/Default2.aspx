<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %>
<!--thickbox,�Ӳ���-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title></title>
  <link rel="stylesheet" type="text/css" href="CSS/thickbox.css" media="all"/>
  <link rel="stylesheet" type="text/css" href="CSS/main.css" media="all"/>
    
</head>
  
<body>
    
   <script type="text/javascript" src="js/jquery.js"></script>
   <script type="text/javascript" src="js/thickbox.js"></script>
   <script type="text/javascript" src="js/jarallax-0.2.2.js"></script>
  
  
   
   
   
   
    
    
   <%-- <div id="picbox">
    <a href="images/single.jpg" class="thickbox" rel="test" ><img src="images/single.jpg"title="����"  alt="dsad"  height="50" width="50"/></a>
    <a href="images/��������.jpg"  class="thickbox" rel="test" ><img src="images/single.jpg"title="����"  alt="dsad"  height="50" width="50"/></a>
    <a href="images/������.jpg"  class="thickbox" rel="test" ><img src="images/single.jpg"title="����"  alt="dsad"  height="50" width="50"/></a>
    <a href="images/single.jpg"  class="thickbox" rel="test" ><img src="images/single.jpg"title="����"  alt="dsad"  height="50" width="50"/></a>
    </div>--%>
    
   
    
    
    
    
   
   
  
    
    
    
    <%--<nav>
      <ul>
        <li><a href="#" onClick="jarallax.jumpToProgress( 0, 2000, 30);">Intro</a></li>
        <li><a href="#" onClick="jarallax.jumpToProgress( 10, 2000, 30);">New features</a></li>
        <li><a href="#" onClick="jarallax.jumpToProgress( 20, 2000, 30);">Jump to progress</a></li>
        <li><a href="#" onClick="jarallax.jumpToProgress( 30, 2000, 30);">Smooth scrollbar</a></li>
        <li><a href="#" onClick="jarallax.jumpToProgress( 40, 2000, 30);">Clone animations</a></li>
      </ul>
    </nav>
    <h1 class="logo">Jarallax</h1>
    <div class="container" id="slide1">
      <h2>version: 0.2.2</h2>
      <p>
        <b>New features:</b>
        <ul>
          <li><a href="#" onClick="jarallax.jumpToProgress( 20, 2000, 30);">Jump to progress</a></li>
          <li><a href="#" onClick="jarallax.jumpToProgress( 30, 2000, 30);">Smooth scrollbar</a></li>
          <li><a href="#" onClick="jarallax.jumpToProgress( 40, 2000, 30);">Clone animations</a></li>
        </ul>
      </p>
    </div>
    <div class="container" id="slide2">
      <h2>Jump to progress</h2>
      <p>
        the Jarallax.jumpToProgress method allows the user to animate the Jarallax animation to a position in the animation. 
        This is a very handy method for navigation. To see it in action press one of the navigation buttons on top of the page.
      </p>
<b>Example</b>
<pre>
jarallax.jumpToProgress( 20, 2000, 30);
</pre>
<p>
In this example Jarallax animates to position 20 over 2000 milliseconds with 24 frames a second.
A lower frame rate will increase preformance but lower the amount of updates.
</p>
    </div>
    <div class="container" id="slide3">
      <h2>Smooth scrollbar</h2>
      <p>
        Some browsers smooth out the scrollbar when it is moved (like safari). This makes the Jarallax animations play more smoothly when the scroll bar is moved.
         Most browsers don't smooth out the scrollbar, this is visible when the down arrow is pressed.
Enabling the smoothed scrollbar will animate the current progress of the Jarallax animation to the scrollbar position. 
This prevents animation jumping and animates the website even with small steps. 
This feature does require more updates which makes it more CPU heavy.
      </p>
      <p>
        Enabling the smoothed scrollbar will animate the current progress of the Jarallax animation to the scrollbar position.
        This prevents animation jumping and animates the website even with small steps.
        This feature does require more updates which makes it more CPU heavy.
      </p>
<b>Example:</b>
<pre>
var jarallax = new Jarallax(<b>new ControllerScroll(true)</b>);
</pre>
    </div>
    <div class="container" id="slide4">
      <h2>Clone animations</h2>
      <p>
        In earlier versions of Jarallax every animation needs to be defined. 
        With cloneAnimation existing animations can be cloned and slightly adjusted. 
        With this feature many animations can be created and adjusted with less efford.
      </p>
<b>Example</b>
<pre>
var jarallax = new Jarallax();
var animation = jarallax.addAnimation('#slide1',[{progress:'0', opacity:'0', top:'100%'},
                                                 {progress:'10', opacity:'1', top:'40%'},
                                                 {progress:'20', opacity:'0', top:'0%'}]);
                        
jarallax.<b>cloneAnimation</b>('#slide2',{progress:'+10'}, animation);
jarallax.<b>cloneAnimation</b>('#slide3',{progress:'+20'}, animation);
jarallax.<b>cloneAnimation</b>('#slide4',{progress:'+30'}, animation);
</pre>
<p>
When defining an animation with the addAnimation method, an animation sequence is returned. 
This sequence can be cloned and adjusted with the cloneAnimation method.
</p>
<p>
The first argument expects a selector, the second an object or array with the key modifications. 
The third argument is the original animation sequence which you want to clone.
</p>
    </div>

  

 <script type="text/javascript">
     var jarallax
     init = function() {
         jarallax = new Jarallax(new ControllerScroll(true));
         var currentProgress = 0;
         var progressSteps = 1 / 5;

         jarallax.setDefault('.container', { opacity: 0, display: 'none' })

         jarallax.addAnimation('.logo', [{ progress: '0', opacity: '1', backgroundPositionY: '50%' },
                                       { progress: '10', opacity: '0', backgroundPositionY: '0%' },
                                       { progress: '100%', opacity: '0', backgroundPositionY: '0%'}]);

         var animation = jarallax.addAnimation('#slide1', [{ progress: '0', display: 'block', opacity: '0', top: '100%' },
                                                         { progress: '10', display: 'block', opacity: '1', top: '20%' },
                                                         { progress: '20', display: 'block', opacity: '0', top: '0%'}]);

         jarallax.cloneAnimation('#slide2', { progress: '+10' }, animation);
         jarallax.cloneAnimation('#slide3', { progress: '+20' }, animation);
         jarallax.cloneAnimation('#slide4', { progress: '+30' }, animation);
     }

     init();
    </script>--%>
    

   
</body>
</html>
