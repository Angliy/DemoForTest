using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using log4net;

public partial class Default11 : System.Web.UI.Page
{

    private static readonly ILog Log = LogManager.GetLogger("loginfo");

    protected void Page_Load(object sender, EventArgs e)
    {

        Log.Info("测试");
        

    }
}
