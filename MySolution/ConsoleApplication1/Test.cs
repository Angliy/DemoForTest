using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


using System.Data.Common;
using System.Collections;
using System.Reflection;
using System.Collections.Generic;

using System.Web.Script.Serialization;


namespace ConsoleApplication1
{
    public  class Test:TestBase
    {

        public string Name { get; set; }


        public string Name1 { get; set; }
        public string Name2{ get; set; }

        [ScriptIgnore]
        public string Name3 { get; set; }



        public void test()
        {
            ScriptIgnoreAttribute ss = new ScriptIgnoreAttribute();

            
 
        }
    }
}
