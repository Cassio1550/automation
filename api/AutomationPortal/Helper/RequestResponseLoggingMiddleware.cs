using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.IO;

namespace AutomationPortal.Helper
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;
        public RequestResponseLoggingMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<RequestResponseLoggingMiddleware>();
            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();
        }
        public async Task Invoke(HttpContext context)
        {
            await LogRequest(context);
            await _next(context);
            //await LogResponse(context);
        }

        private async Task LogRequest(HttpContext context)
        {
            if (context.Request.Method == HttpMethods.Get)
            {
                _logger.LogDebug($"user:{context.User?.Identity?.Name} method: {context.Request.Method} path: {context.Request.Path} querystring: {context.Request.QueryString}");
            }
            else
            {
                context.Request.EnableBuffering();
                await using var requestStream = _recyclableMemoryStreamManager.GetStream();
                await context.Request.Body.CopyToAsync(requestStream);
                _logger.LogInformation($"user:{context.User?.Identity?.Name} method: {context.Request.Method} path: {context.Request.Path} querystring: {context.Request.QueryString}  body: {ReadStreamInChunks(requestStream)}");
                context.Request.Body.Position = 0;
            }
        }
        //private async Task LogResponse(HttpContext context) { }

        private static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);
            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);
            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;
            do
            {
                readChunkLength = reader.ReadBlock(readChunk, 0, readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);
            return textWriter.ToString();
        }
    }
}
