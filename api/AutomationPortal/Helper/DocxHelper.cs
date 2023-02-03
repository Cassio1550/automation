using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;

namespace AutomationPortal.Helper
{
    public class DocxHelper
    {
        public static byte[] ReplaceDocumentContent(string path, Dictionary<string, object> data)
        {
            using var fileStream = new FileStream(path, FileMode.Open);

            using var memoryStream = new MemoryStream();
            CopyStream(fileStream, memoryStream);

            using (var wordDocument = WordprocessingDocument.Open(memoryStream, true))
            {

                foreach (var item in data)
                {
                    wordDocument.Package.PackageProperties.Title = Replace(wordDocument.Package.PackageProperties.Title, "{{" + item.Key + "}}", item.Value);
                }


                var documentParts = new List<OpenXmlPart>();
                documentParts.AddRange(wordDocument.MainDocumentPart.HeaderParts);
                documentParts.Add(wordDocument.MainDocumentPart);

                foreach (var documentPart in documentParts)
                {
                    string docText = null;
                    using (StreamReader sr = new StreamReader(documentPart.GetStream()))
                    {
                        docText = sr.ReadToEnd();
                    }

                    foreach (var item in data)
                    {
                        docText = Replace(docText, "{{" + item.Key + "}}", item.Value);
                    }

                    using (var sw = new StreamWriter(documentPart.GetStream(FileMode.Create)))
                    {
                        sw.Write(docText);
                    }
                }
            }

            return memoryStream.ToArray();
        }

        private static string Replace(string text, string pattern, object replacementObject)
        {
            var lineBreak = "<w:br/>";
            var replacement = (replacementObject ?? string.Empty).ToString();
            replacement = new Regex("\n").Replace(replacement, lineBreak);

            return new Regex(pattern).Replace(text, replacement);
        }

        static private void CopyStream(Stream source, Stream destination)
        {
            byte[] buffer = new byte[32768];
            int bytesRead;
            do
            {
                bytesRead = source.Read(buffer, 0, buffer.Length);
                destination.Write(buffer, 0, bytesRead);
            } while (bytesRead != 0);
        }

    }
}
