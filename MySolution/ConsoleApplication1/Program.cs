
using System.Data.OracleClient;

using System;
using System.Data;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

using System.Data.Common;
using System.Collections;
using System.Reflection;
using System.Collections.Generic;

using System.Web.Script.Serialization;
using System.Net.Sockets;


using Newtonsoft.Json;



namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {



            ////非断开式连接
            ////新建连接字符串
            //String conStr = "Data Source=127.0.0.1/orcl;Persist Security Info=True;User ID=test;Password=test;Unicode=True";
            ////新建连接对象
            //OracleConnection con = new OracleConnection(conStr);
            ////新建Command对象
            //OracleCommand cmd = new OracleCommand("select * from user_test", con);
            ////新建DataReader对象
            //OracleDataReader reader=null;
            //try
            //{
            //    con.Open();
            //    //执行Command查询命令返回DataReader对象
            //    reader = cmd.ExecuteReader();
            //    //遍历DataReader对象获取结果
            //    if (reader.HasRows)
            //    {
            //        while (reader.Read())
            //        {
            //            for (int i = 0; i < reader.FieldCount; i++)
            //            {
            //                Console.Write(reader.GetString(i) + " ");
            //            }
            //            Console.WriteLine();
            //        }
            //    }
            //    Console.Read();
            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine(e.Message); Console.Read();
            //}
            //finally {
            //    //关闭DataReader对象
            //    reader.Close();
            //    //关闭Connection对象
            //    con.Close();
            //}


            ////断开式连接
            ////新建连接字符串
            //String conStr = "Data Source=127.0.0.1/orcl;Persist Security Info=True;User ID=test;Password=test;Unicode=True";
            ////新建连接对象
            //OracleConnection con = new OracleConnection(conStr);
            ////新建Command对象
            //OracleCommand cmd = new OracleCommand("select * from user_test", con);
            ////新建适配器DataAdapter对象
            //OracleDataAdapter da = new OracleDataAdapter(cmd);
            ////新建数据集对象DataSet
            //DataSet ds = new DataSet();
            //try
            //{
            //    //适配器装载数据集对象
            //    da.Fill(ds, "test");
            //    //获取数据集中的DataTable
            //    DataTable dt=ds.Tables["test"];
            //    //遍历DataTable
            //   foreach(DataRow dr in dt.Rows)
            //   {
            //       for (int i = 0; i < dt.Columns.Count; i++)
            //       {
            //           Console.Write(dr[i].ToString()+" ");
            //       }
            //       Console.WriteLine();
            //   }
            //   Console.Read();
            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine(e.Message); Console.Read();
            //}


            //int[] str = new int[3]{1,2,3};

            //Console.WriteLine(str.ToString());

            //Console.Read();
            



            ContactWork("192.168.0.236", 8761, 6000, "2");





            

        }







        /// <summary>
        /// 与服务器通信
        /// </summary>
        /// <param name="ip">IP地址</param>
        /// <param name="port">端口</param>
        /// <param name="timeout">超时时间</param>
        /// <param name="cmd">命令</param>
        /// <returns></returns>
        public static void ContactWork(string ip, int port, int timeout, string cmd)
        {
            TcpClient client = null;
            NetworkStream stream = null;
            try
            {
                client = new TcpClient(ip, port);
                client.ReceiveTimeout = timeout;
                stream = client.GetStream();
                Work(cmd, stream);

                Console.Read();

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.Read();
            }
            finally
            {
                if (stream != null)
                    stream.Close();
                if (client != null && client.Connected)
                    client.Close();
            }
        }








        /// <summary>
        /// 获取通信返回信息
        /// </summary>
        /// <param name="cmd">命令</param>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static void Work(string cmd, NetworkStream stream)
        {
            Byte[] buffer = System.Text.Encoding.GetEncoding("GB2312").GetBytes(cmd);
            stream.Write(buffer, 0, buffer.Length);

            Console.WriteLine("发送信息:" +cmd);

            buffer = new Byte[1024];
            StringBuilder sb = new StringBuilder();
            Int32 numberOfBytesRead = 0;
            do
            {
                numberOfBytesRead = stream.Read(buffer, 0, buffer.Length);
                sb.Append(System.Text.Encoding.GetEncoding("GB2312").GetString(buffer, 0, numberOfBytesRead));
            }
            while (stream.DataAvailable);

            string result = sb.ToString();
            if (string.IsNullOrEmpty(result))
             Console.WriteLine("DServer无响应,请检查服务是否正常运行.");

            if (result.StartsWith("OK"))
            {
                if (result.Length == 2)
                {
                    Console.WriteLine("任务已接收");
                }
                else
                {
                    Console.WriteLine(result.Substring(3));
                }

            }
        }










        /// <summary>
        /// JsonHelper 类的扩展方法
        /// </summary>
        /// <param name="jsonObject">要被序列化的 JSON 对象</param>
        /// <returns>返回被序列化后的 Json 字符串</returns>
        //static string ToJson(object jsonObject)
        //{



        //    JavaScriptSerializer jan = new JavaScriptSerializer();
            
        //    ////首先当然是JSON序列化
        //    //DataContractJsonSerializer serializer = new DataContractJsonSerializer(jsonObject.GetType());

        //    //// 定义一个stream用来存发序列化之后的内容
        //    //Stream stream = new MemoryStream();
        //    //serializer.WriteObject(stream, jsonObject);

        //    //// 从头到尾将stream读取成一个字符串形式的数据，并且返回
        //    //stream.Position = 0;
        //    //StreamReader streamReader = new StreamReader(stream);

        //    ////return streamReader.ReadToEnd();

        //    //string output = jan.Serialize(
        //    //return output;
        //}






    }


}
