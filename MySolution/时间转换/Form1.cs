using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.OracleClient;


namespace 时间转换
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {


            ShowDialog();
            try
            {
                UInt32 time = Convert.ToUInt32(textBox1.Text.Trim());
                label1.Text = WhoYao.Common.Model.TimeSpan.FromSecond(time).ToString();
            }
            catch (Exception)
            {
                label1.Text = "输入字符串不合理";
            }

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                OracleConnection conn = new OracleConnection("Data Source=127.0.0.1/orcl;User Id=test;Password=test");
                conn.Open();
            }

            catch (Exception ex) { }

        }
    }
}
