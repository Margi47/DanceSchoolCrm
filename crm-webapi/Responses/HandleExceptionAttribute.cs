using crm_webapi.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Responses
{
    public class HandleExceptionAttribute: ExceptionFilterAttribute
    {
        private readonly ILogger<HandleExceptionAttribute> _logger;

        public HandleExceptionAttribute(ILogger<HandleExceptionAttribute> logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is EntityNotFoundException)
            {
                var notFoundException = context.Exception as EntityNotFoundException;
                _logger.LogInformation("Entity was not found.");
                context.Result = new NotFoundObjectResult(new ApiEntityNotFoundResponse(
                    notFoundException.Entity, notFoundException.Id, notFoundException.SecondId));

            }
            else if (context.Exception is BadRequestException)
            {
                var badRequestException = context.Exception as BadRequestException;
                _logger.LogInformation(badRequestException.ErrorMessage);
                context.Result = new BadRequestObjectResult(new ApiBadRequestResponse(
                        badRequestException.ErrorMessage));
            }
            else if (context.Exception is EntityDuplicateException)
            {
                var duplicateException = context.Exception as EntityDuplicateException;
                _logger.LogInformation("Entity already exists.");
                context.Result = new BadRequestObjectResult(new ApiDuplicatedEntityResponse(
                        duplicateException.Entity, duplicateException.Id, duplicateException.SecondId));
            }
            else
            {
                _logger.LogError("Unhandled exception.");
                var result = new ObjectResult(new ApiErrorResponse("Unhandled error occurred."));
                result.StatusCode = StatusCodes.Status500InternalServerError;
                context.Result = result;
            }

            return;
        }
    }
}
