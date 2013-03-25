using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Net;
using System.IO;
using System.Text;

public partial class Default1 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


        requestUrl("http://go.cqmmgo.com/topic/activity/activity_ajax.php?obj=activity_page&req=vote&activity_id=15&item_id=13585",
                   "obj=activity_page&req=vote&activity_id=15&item_id=13585", 2);


        requestUrl("http://go.cqmmgo.com/topic/activity/activity_ajax.php?obj=activity_page&req=vote&activity_id=15&item_id=13585",
                    "obj=activity_page&req=vote&activity_id=15&item_id=13585", 2);
    }

      

    #region 请求执行远程网页并发送数据
    /// <summary>
    /// 请求执行远程网页并发送数据
    /// </summary>
    /// <param name="pageUrl"></param>
    /// <param name="msg"></param>
    /// <param name="reqType">1为GET，2为POST</param>
    /// <returns></returns>
    public static string requestUrl(string pageUrl, string msg, int reqType)
    {
        //string strQuery = "SendData=" + Crypt.encrypt(msg);     //对传输的数据进行加密
        string strQuery = msg;     //对传输的数据进行加密
        string returnValue = "";
        if (reqType == 2)
        {
            WebRequest Wrequest = WebRequest.Create(pageUrl);
            Wrequest.Timeout = 8000;
            Wrequest.Method = "POST";
            Wrequest.ContentType = "application/x-www-form-urlencoded";
            string dataSend = strQuery;
            Wrequest.ContentLength = dataSend.Length;

            byte[] buff = Encoding.UTF8.GetBytes(dataSend);
            Stream reqStream = Wrequest.GetRequestStream();
            reqStream.Write(buff, 0, buff.Length);
            reqStream.Close();

            WebResponse Wresponse = Wrequest.GetResponse();
            Stream repStream = Wresponse.GetResponseStream();
            StreamReader sr = new StreamReader(repStream, Encoding.GetEncoding("GB2312"));
            returnValue = sr.ReadToEnd().ToString();
            sr.Close();
        }
        else if (reqType == 1)
        {
            WebRequest Wrequest = WebRequest.Create(pageUrl + "?" + strQuery);
            Wrequest.Timeout = 8000;
            WebResponse Wresponse = Wrequest.GetResponse();
            Stream resStream = Wresponse.GetResponseStream();
            StreamReader sr = new StreamReader(resStream, System.Text.Encoding.GetEncoding("GB2312"));
            returnValue = sr.ReadToEnd().ToString();
            resStream.Close();
            sr.Close();
        }
        return returnValue;
    }
    #endregion
}
