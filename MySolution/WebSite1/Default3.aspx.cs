using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;


public partial class Default3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


        MailAddress MessageFrom = new MailAddress("iwill@reuniontech.com");

        string MessageTo = "ly89924@163.com|liyangzzu@163.com|732743474@qq.com";

        string MessageSubject = "test";

        string MessageBody = "我就是测试一下";


        if (SendMail(MessageFrom, MessageTo, MessageSubject, MessageBody) == true)
        {
            Response.Write("success");
        }



    }


    /// <summary>
    /// 外发邮件支持群发
    /// </summary>
    /// <param name="MessageFrom">发件人</param>
    /// <param name="MessageTo">群发多用户使用"|"格开地址</param>
    /// <param name="MessageSubject">邮件主题</param>
    /// <param name="MessageBody">邮件内容</param>
    /// <returns>是否发送成功</returns>
    public bool SendMail(MailAddress MessageFrom, string MessageTo, string MessageSubject, string MessageBody)
    {


        MailMessage message = new MailMessage();

        message.From = MessageFrom;

        string[] mtuser = MessageTo.Split('|');
        foreach (string m in mtuser)
        {
            message.To.Add(m);
        }

        message.Subject = MessageSubject;
        message.Body = MessageBody;
        message.IsBodyHtml = true;              //是否为html格式
        message.Priority = MailPriority.High;   //发送邮件的优先等级


        SmtpClient sc = new SmtpClient("smtp.gmail.com"); //指定发送邮件的服务器地址或IP
      
        sc.Port = 587;   //指定发送邮件端口
        sc.EnableSsl = true;
        sc.Credentials = new System.Net.NetworkCredential("iwill@reuniontech.com", "000000"); //指定登录服务器的用户名和密码
        //try
        //{
            sc.Send(message);       //发送邮件
        //}
        //catch
        //{
        //    return false;
        //}
        return true;
    }

}
