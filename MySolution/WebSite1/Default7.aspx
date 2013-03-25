<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default7.aspx.cs" Inherits="Default7" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!--js测试-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    
    <script type="text/javascript">

//        var o = new Object();
//        var now = new Date();
         //门户大开
//        var Book = function(isbn, title, author) {

//            this.isbn = isbn;
//            this.title = title;
//            this.author = author;

//        }

//        Book.prototype.display = function() {}


        //命名规范

//        var Book = function(isbn, title, author) {
//            this.setIsbn(isbn);
//            this.setTitle(title);
//            this.setAuthor(author);
//        }

//        Book.prototype = {

//            getIsbn: function() { return this._isbn; },

//            setIsbn: function(isbn) { this._isbn = isbn; },

//            getTitle: function() { return this._title; },

//            setTitle: function(title) { this._title = title },

//            getAuthor: function() { return this._author; },

//            setAuthor: function(author) { this._author = author; }

//        }

        //使用闭包创建真正的私有成员


//        var Book = function(newIsbn, newTitle, newAuthor) {

//            //私有成员
//            var isbn, title, author;
//            //私有方法
//            function checkIsbn() { }
//            //特权方法
//            this.getIsbn = function() { return isbn; };
//            this.setIsbn = function(newIsbn) { isbn = newIsbn; };
//            this.getTitle = function() { return title; };
//            this.setTitle = function(newTitle) { title = newTitle; };
//            this.getAuthor = function() { return author; };
//            this.setAuthor = function(newAuthor) { author = newAuthor; };
//            this.setIsbn(newIsbn);
//            this.setTitle(newTitle);
//            this.setAuthor(newAuthor);

//        }

//         Book.prototype.display = function() {
        //         }





//        function foo() {
//            var a = 10;
//            function bar() {
//                a *= 2;
//                return a;
//            }
//            return bar;
//        }

//        var baz = foo();
//        baz(); //a=20
//        baz(); //a=40
//        baz(); //a=80


        //javascript中this

//        var name = "The Window";
//        var object = {
//            name: "My Object",
//            getNameFunc: function() {
//                return function() {
//                    return this.name;
//                };
//            }
//        };
//        alert(object.getNameFunc()());



//        var Singleton = {
//            attribute1: true,
//            attribute2: 10,
//            method1: function() { },
//            method2: function() { }
//        };



//        MyNamespace = {};

//        MyNamespace.Singleton = (function() {

//            var privateAttribute1 = false;

//            function privateMethod() { }

//            return {
//                attribute1: true,
//                attribute2: 10,
//                method1: function() { },
//                method2: function() { }

//            }
//       })();


//       MyNamespace = {};
//       MyNamespace.Singleton = (function() {
//           var uniqueInstance;
//           function constructor() {
//               var privateAttribute1 = false;
//               function privateMethod() { }
//               return {
//                   attribute1: true,
//                   attribute2: 10,
//                   method1: function() { alert("asdsadasd"); },
//                   method2: function() { }
//               }
//           }
//           return {
//               getInstance: function() {
//                   if (!uniqueInstance) {
//                       uniqueInstance = constructor();
//                   }
//                   return uniqueInstance;
//               }
//           }
//       })();



//       MyNamespace.Singleton.getInstance().method1();



//        function ClassA() {  }

//        ClassA.prototype.color = "red";
//        ClassA.prototype.sayColor = function() {
//            alert(this.color);
//        }

//        function ClassB() { }

//        ClassB.prototype = new ClassA();

//        b = new ClassB();
        //        b.sayColor();




//        function ClassA(sColor) {
//            this.sColor = sColor;
//            this.sayColor = function() {
//                alert(this.sColor);
//           }
//       }

//       function ClassB(sColor, name) {

//           this.newMethod = ClassA;
//           this.newMethod(sColor);
//           delete this.newMethod;

//           this.name = name;
//           this.sayName = function() {
//               alert(this.name);
//           }
//       }

//       objA = new ClassA("red");
//       objB = new ClassB("blue", "tom");
//       objA.sayColor();
//       objB.sayColor();
//       objB.sayName();
    
    
    
    </script>
    
    
</body>
</html>
