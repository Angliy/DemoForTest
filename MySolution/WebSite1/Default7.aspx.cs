using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default7 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string editId=Request.QueryString["editId"];
        if (String.IsNullOrEmpty(editId))
        {
            //无参
        }
        else
        {
            //有参
        }

    }
}
