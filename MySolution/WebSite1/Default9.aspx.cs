using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using Msword = Microsoft.Office.Interop.Word;

public partial class Default9 : System.Web.UI.Page
{

  
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    



    
    private Msword.Application wordApp;//定义一个wordapp应用程序
    private Msword.Document wordDoc;//定义一个worddoc文档
    public void CreateWord()
    {

            object Nothing =System.Reflection.Missing.Value;//定义一个missing
            wordApp = new Msword.ApplicationClass();//对wordapp进行初始化
            wordDoc = wordApp.Documents.Add(ref Nothing, ref Nothing, ref Nothing, ref Nothing);//对一个wordDoc进行初始化
            object filename = "F:\\aa.doc";
            if (File.Exists(filename.ToString()))//判断文件是否存在
            {
                File.Delete(filename.ToString());//若文件存在就删除这个文件
            }
            wordApp.Visible = true;//设置动态建立的word文档可见
            wordApp.Selection.PageSetup.LeftMargin = wordApp.CentimetersToPoints(float.Parse("2"));//设置word文档的左边距
            wordApp.Selection.PageSetup.RightMargin = wordApp.CentimetersToPoints(float.Parse("2"));//设置word文档右边距
            wordApp.ActiveWindow.HorizontalPercentScrolled = 11;//设置文档的水平滑动距离
            wordApp.ActiveWindow.View.Type = Msword.WdViewType.wdOutlineView;//设置文档的页眉类型
            wordApp.ActiveWindow.View.SeekView = Msword.WdSeekView.wdSeekCurrentPageHeader;//设置文档的页眉是显示在文档的头部
            wordApp.ActiveWindow.ActivePane.Selection.InsertAfter ( "这是我的页眉内容");
            wordApp.Selection.ParagraphFormat.Alignment = Msword.WdParagraphAlignment.wdAlignParagraphRight ;//设置页眉内容的对齐方式
            //wordApp.ActiveWindow.View.SeekView = Msword.WdSeekView.wdSeekMainDocument;//跳出页眉设置
            wordApp.Selection.ParagraphFormat.LineSpacing = 11f;//设置段落的距离为11f
            Msword.Paragraph para1;//定义一个段落为para1
            para1 = wordDoc.Paragraphs.Add(ref Nothing);//对para1进行初始化
            para1.Range.Text = "这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2";//对段落para1进行添加内容
            para1.Format.CharacterUnitFirstLineIndent = 2;//设置首行缩进
            para1.Range.Font.Color = Msword.WdColor.wdColorBlue;//设置字体的颜色
            para1.Format.SpaceAfter = 6;//在段落para1后面设置空行为6
            para1.Range.InsertParagraphAfter();//将段落para1添加到文档中
            Msword.Paragraph para2;//同上
            object endofdoc = "\\endofdoc";//定义标签endofdoc,"endofdoc"表示文档的末尾书签
            object range1 = wordDoc.Bookmarks.get_Item(ref endofdoc).Range;//定位到文档的书签处
            para2 = wordDoc.Paragraphs.Add(ref range1);//同上
            para2.Range.Text = "asfdasdfasdfasdffasdfsadfasdfasfdasdfas";//同上
            para2.Range.InsertParagraphAfter();//同上
            Msword.Paragraph para3;//同上
            object range2 = wordDoc.Bookmarks.get_Item(ref endofdoc).Range;//同上
            para3 = wordDoc.Paragraphs.Add(ref range2);//同上
            para3.Range.Text = "eeeeeeeeeeeeeeeeeeeeeeee";//同上
            object sttar = (object)(para3.Range.Start + 2);//"para3.Range.Start "表示para3段落的开始处加上两个字符
            object eend = (object)(para3.Range.Start + 2 );//同上
            wordDoc.Range(ref sttar, ref eend).InsertBefore("ttt");//定位到para3段落的开始处加上两个字符并添加内容"ttt"
            para3.Format.CharacterUnitFirstLineIndent = 2;//设置首行缩进
            para3.Range.Font.Bold=5;//设置段落para3字体颜色
            para3.Range.InsertParagraphAfter();//同上
            Msword.Table table1 = wordDoc.Tables.Add(para3.Range , 8, 8, ref Nothing, ref Nothing);//在文档中添加8行8列的表格
            table1.Cell(1, 1).Range.Font.Color = Msword.WdColor.wdColorBrown;//设置表格中的第1行1列的字体颜色为wdColorBrown
            table1.Cell(1, 1).Range.Text = "搜点的撒旦";//在表格中的第一行第一类中添加内容
            table1.Range.ParagraphFormat.Alignment = Msword.WdParagraphAlignment.wdAlignParagraphRight;//设置表格中的内容alignment
            table1.Cell(3,3).Merge(table1.Cell(8,3));//将3行3列一直到8行3列进行组合成一列
            object row = 4;
            object col = 4;
            table1.Cell(3, 1).Split(ref row, ref col);//将3行1列分开为4行4列
            string  picturefile = "F:\\All photos\\我的照片\\aa.jpg";//设置图片的路径
            object linktofile=false;
            object linktodoctument=true;
            object x1=(object)(para2.Range.Start);
            object x2=(object)(para2.Range.End);
            object rr1 = wordDoc.Range(ref x1, ref x2);
            wordDoc.Application.ActiveDocument.InlineShapes.AddPicture(picturefile, ref linktofile, ref linktodoctument, ref rr1);//将图片添加到文档中
            //将图片的外形设置为可变
            Msword.Shape shape1 = wordDoc.Application.ActiveDocument.InlineShapes[1].ConvertToShape();
            shape1.WrapFormat.Type = Msword.WdWrapType.wdWrapSquare;
            //保存wordDoc
            wordDoc.SaveAs(ref filename, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                ref Nothing, ref Nothing);
            //释放内存
            wordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
            wordApp.Quit(ref Nothing, ref Nothing, ref Nothing);
      
        }




    protected void Button1_Click(object sender, EventArgs e)
    {
        object Nothing = System.Reflection.Missing.Value;//定义一个missing
        wordApp = new Msword.ApplicationClass();//对wordapp进行初始化
        wordDoc = wordApp.Documents.Add(ref Nothing, ref Nothing, ref Nothing, ref Nothing);//对一个wordDoc进行初始化
        object filename = "F:\\aa.doc";
        if (File.Exists(filename.ToString()))//判断文件是否存在
        {
            File.Delete(filename.ToString());//若文件存在就删除这个文件
        }
        wordApp.Visible = false;//设置动态建立的word文档可见
        wordApp.Selection.PageSetup.LeftMargin = wordApp.CentimetersToPoints(float.Parse("2"));//设置word文档的左边距
        wordApp.Selection.PageSetup.RightMargin = wordApp.CentimetersToPoints(float.Parse("2"));//设置word文档右边距
        wordApp.ActiveWindow.HorizontalPercentScrolled = 11;//设置文档的水平滑动距离
        wordApp.ActiveWindow.View.Type = Msword.WdViewType.wdOutlineView;//设置文档的页眉类型
        wordApp.ActiveWindow.View.SeekView = Msword.WdSeekView.wdSeekCurrentPageHeader;//设置文档的页眉是显示在文档的头部
        wordApp.ActiveWindow.ActivePane.Selection.InsertAfter("这是我的页眉内容");
        wordApp.Selection.ParagraphFormat.Alignment = Msword.WdParagraphAlignment.wdAlignParagraphRight;//设置页眉内容的对齐方式
        //wordApp.ActiveWindow.View.SeekView = Msword.WdSeekView.wdSeekMainDocument;//跳出页眉设置
        wordApp.Selection.ParagraphFormat.LineSpacing = 11f;//设置段落的距离为11f
        Msword.Paragraph para1;//定义一个段落为para1
        para1 = wordDoc.Paragraphs.Add(ref Nothing);//对para1进行初始化
        para1.Range.Text = "这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2这是我的内容2";//对段落para1进行添加内容
        para1.Format.CharacterUnitFirstLineIndent = 2;//设置首行缩进
        para1.Range.Font.Color = Msword.WdColor.wdColorBlue;//设置字体的颜色
        para1.Format.SpaceAfter = 6;//在段落para1后面设置空行为6
        para1.Range.InsertParagraphAfter();//将段落para1添加到文档中
        Msword.Paragraph para2;//同上
        object endofdoc = "\\endofdoc";//定义标签endofdoc,"endofdoc"表示文档的末尾书签
        object range1 = wordDoc.Bookmarks.get_Item(ref endofdoc).Range;//定位到文档的书签处
        para2 = wordDoc.Paragraphs.Add(ref range1);//同上
        para2.Range.Text = "asfdasdfasdfasdffasdfsadfasdfasfdasdfas";//同上
        para2.Range.InsertParagraphAfter();//同上
        Msword.Paragraph para3;//同上
        object range2 = wordDoc.Bookmarks.get_Item(ref endofdoc).Range;//同上
        para3 = wordDoc.Paragraphs.Add(ref range2);//同上
        para3.Range.Text = "eeeeeeeeeeeeeeeeeeeeeeee";//同上
        object sttar = (object)(para3.Range.Start + 2);//"para3.Range.Start "表示para3段落的开始处加上两个字符
        object eend = (object)(para3.Range.Start + 2);//同上
        wordDoc.Range(ref sttar, ref eend).InsertBefore("ttt");//定位到para3段落的开始处加上两个字符并添加内容"ttt"
        para3.Format.CharacterUnitFirstLineIndent = 2;//设置首行缩进
        para3.Range.Font.Bold = 5;//设置段落para3字体颜色
        para3.Range.InsertParagraphAfter();//同上
        Msword.Table table1 = wordDoc.Tables.Add(para3.Range, 8, 8, ref Nothing, ref Nothing);//在文档中添加8行8列的表格
        table1.Cell(1, 1).Range.Font.Color = Msword.WdColor.wdColorBrown;//设置表格中的第1行1列的字体颜色为wdColorBrown
        table1.Cell(1, 1).Range.Text = "搜点的撒旦";//在表格中的第一行第一类中添加内容
        table1.Range.ParagraphFormat.Alignment = Msword.WdParagraphAlignment.wdAlignParagraphRight;//设置表格中的内容alignment
        table1.Cell(3, 3).Merge(table1.Cell(8, 3));//将3行3列一直到8行3列进行组合成一列
        object row = 4;
        object col = 4;
        table1.Cell(3, 1).Split(ref row, ref col);//将3行1列分开为4行4列
        string picturefile = "D:\\ly\\应用\\test.jpg";//设置图片的路径
        object linktofile = false;
        object linktodoctument = true;
        object x1 = (object)(para2.Range.Start);
        object x2 = (object)(para2.Range.End);
        object rr1 = wordDoc.Range(ref x1, ref x2);
        wordDoc.Application.ActiveDocument.InlineShapes.AddPicture(picturefile, ref linktofile, ref linktodoctument, ref rr1);//将图片添加到文档中
        //将图片的外形设置为可变
        Msword.Shape shape1 = wordDoc.Application.ActiveDocument.InlineShapes[1].ConvertToShape();
        shape1.WrapFormat.Type = Msword.WdWrapType.wdWrapSquare;
        //保存wordDoc
        wordDoc.SaveAs(ref filename, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing,
            ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing,
            ref Nothing, ref Nothing);
        //释放内存
        wordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
        wordApp.Quit(ref Nothing, ref Nothing, ref Nothing);
    }
}


