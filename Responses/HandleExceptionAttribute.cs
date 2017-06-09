using angular.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class HandleExceptionAttribute: ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is EntityNotFoundException)
            {
                var notFoundException = context.Exception as EntityNotFoundException;
                context.Result = new NotFoundObjectResult(new ApiEntityNotFoundResponse(
                    notFoundException.Entity, notFoundException.Id, notFoundException.SecondId));

            }
            else if (context.Exception is BadRequestException)
            {
                var badRequestException = context.Exception as BadRequestException;
                context.Result = new BadRequestObjectResult(new ApiBadRequestResponse(
                        badRequestException.ErrorMessage));
            }
            else if (context.Exception is EntityDuplicateException)
            {
                var dublicateException = context.Exception as EntityDuplicateException;
                context.Result = new BadRequestObjectResult(new ApiDublicatedEntityResponse(
                        dublicateException.Entity, dublicateException.Id, dublicateException.SecondId));
            }
            else
            {
                var result = new ObjectResult(new ApiErrorResponse("Unhandled error occurred."));
                result.StatusCode = StatusCodes.Status500InternalServerError;
                context.Result = result;
            }

            return;
        }
    }
}
