using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutomationPortal.Constants
{
    public class Role
    {
        public const string ADMIN = "admin";
        public const string USER = "user";
        public const string READONLY = "readonly";

        public static readonly string[] ANY = { ADMIN, USER, READONLY };
        public static readonly string[] WRITE = { ADMIN, USER };
    }
}
