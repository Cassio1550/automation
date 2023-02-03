using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutomationPortal.DB.Entity;

namespace AutomationPortal.Helper
{
    public static class DictionaryHelper
    {
        public static Dictionary<string, object> ObjectToDictionary(object source)
        {
            var dict = new Dictionary<string, object>();

            foreach (var property in source.GetType().GetProperties().Where(p => Type.GetTypeCode(p.PropertyType) != TypeCode.Object))
            {
                dict.Add(property.Name, property.GetValue(source, null));
            }

            return dict;
        }

        public static void AddCustomFieldValue(this Dictionary<string, object> dict, CustomFieldValue customFieldValue)
        {
            dict.AddIfDoNotExist(customFieldValue.CustomField.Name, customFieldValue.Value);
        }

        public static void AddIfDoNotExist<TKey, TValue>(this Dictionary<TKey, TValue> dict, TKey key, TValue value) where TKey : notnull
        {
            if (!dict.ContainsKey(key))
                dict.Add(key, value);
        }

        public static void AddOrReplace<TKey, TValue>(this Dictionary<TKey, TValue> dict, TKey key, TValue value) where TKey : notnull
        {
            if (dict.ContainsKey(key))
                dict[key] = value;
            else
                dict.Add(key, value);
        }
    }
}
