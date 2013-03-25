using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.OracleClient;


public partial class Default8 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        //string constr = "DRIVER={MySQL ODBC 5.1 Driver};SERVER=192.168.1.147;DATABASE=ReMain;UID=usr;PASSWORD=usr;OPTION=3";

        //string constr = "Provider=Microsoft.Jet.OLEDB.4.0;SERVER=192.168.1.147;DATABASE=ReMain;UID=usr;PASSWORD=usr;OPTION=3";

        // OleDbConnection con = new  OleDbConnection(constr);

        //con.Open();

       // txt_search.Value = "dasdasd";

       // Response.Write(CheckStr("abfsdfsdfa"));

        //OracleConnection conn = new OracleConnection("Data Source=127.0.0.1/orcl;Persist Security Info=True;User ID=test;Password=test;Unicode=True");
        //conn.Open();




       // Test();

         
     

        
    }




    public void Test()
    {


        // create connection
        OracleConnection conn = new OracleConnection("Data Source=192.168.0.11/orcl;Persist Security Info=True;User ID=d_u_otls2012_v12;Password=d_u_otls2012_v12;Unicode=True");

        // create the command for the stored procedure
        OracleCommand cmd = new OracleCommand();
        cmd.Connection = conn;
        cmd.CommandText = "OTLS_COMMON_PAGELIST_PROC";
        cmd.CommandType = CommandType.StoredProcedure;

        //List<DbParameter> dbParams = new List<DbParameter>();
        //dbParams.Add(BuildInParam("TableName", OracleType.NVarChar, TableName));
        //dbParams.Add(BuildInParam("Filters", OracleType.NVarChar, filter));
        //dbParams.Add(BuildInParam("PageIndex", OracleType.Number, pageNumber));
        //dbParams.Add(BuildInParam("PageSize", OracleType.Number, pageSize));
        //dbParams.Add(BuildOutParam("TotalRows", OracleType.Number));
        //dbParams.Add(BuildOutParam("DataRows", OracleType.Cursor));




        // add the parameters for the stored procedure including the REF CURSOR
        // to retrieve the result set
        cmd.Parameters.Add("TableName", OracleType.NVarChar).Value = "OTLS_CALCITEMS";
        cmd.Parameters.Add("Filters", OracleType.NVarChar).Value = "ItemType=1 order by itemtype";
        cmd.Parameters.Add("PageIndex", OracleType.Number).Value = 1;
        cmd.Parameters.Add("PageSize", OracleType.Number).Value = 20;

        
        cmd.Parameters.Add("TotalRows", OracleType.Number).Direction = ParameterDirection.Output; 
        cmd.Parameters.Add("DataRows", OracleType.Cursor).Direction = ParameterDirection.Output;

        // open the connection and create the DataReader
        conn.Open();
        OracleDataReader dr = cmd.ExecuteReader();

        // output the results and close the connection.
        while(dr.Read())
        {
            for(int i = 0; i < dr.FieldCount; i++)
                Response.Write(dr[i].ToString() + ";");
          
        }
        conn.Close();


    }



    //public void Test()
    //{


    //    // create connection
    //    OracleConnection conn =new OracleConnection
    //   ("Data Source=192.168.0.11/orcl;Persist Security Info=True;User ID=d_u_otls2012_v12;Password=d_u_otls2012_v12;Unicode=True");

    //    // create the command for the stored procedure
    //    OracleCommand cmd = new OracleCommand();
    //    cmd.Connection = conn;
    //    cmd.CommandText = "OTLS_COMMON_PAGELIST_PROC";
    //    cmd.CommandType = CommandType.StoredProcedure;

    //    //List<DbParameter> dbParams = new List<DbParameter>();
    //    //dbParams.Add(BuildInParam("TableName", OracleType.NVarChar, TableName));
    //    //dbParams.Add(BuildInParam("Filters", OracleType.NVarChar, filter));
    //    //dbParams.Add(BuildInParam("PageIndex", OracleType.Number, pageNumber));
    //    //dbParams.Add(BuildInParam("PageSize", OracleType.Number, pageSize));
    //    //dbParams.Add(BuildOutParam("TotalRows", OracleType.Number));
    //    //dbParams.Add(BuildOutParam("DataRows", OracleType.Cursor));




    //    // add the parameters for the stored procedure including the REF CURSOR
    //    // to retrieve the result set
    //    cmd.Parameters.Add("TableName", OracleType.NVarChar).Value = "OTLS_CALCITEMS";
    //    cmd.Parameters.Add("Filters", OracleType.NVarChar).Value = "ItemType=1 order by itemtype";
    //    cmd.Parameters.Add("PageIndex", OracleType.Number).Value = 1;
    //    cmd.Parameters.Add("PageSize", OracleType.Number).Value = 20;


    //    cmd.Parameters.Add("TotalRows", OracleType.Number).Direction = ParameterDirection.Output;
    //    cmd.Parameters.Add("DataRows", OracleType.Cursor).Direction = ParameterDirection.Output;

    //    // open the connection and create the DataReader
    //    conn.Open();
    //    OracleDataReader dr = cmd.ExecuteReader();

    //    // output the results and close the connection.
    //    while (dr.Read())
    //    {
    //        for (int i = 0; i < dr.FieldCount; i++)
    //            Response.Write(dr[i].ToString() + ";");

    //    }
    //    conn.Close();


    //}


}
