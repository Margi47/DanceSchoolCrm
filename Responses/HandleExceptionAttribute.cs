using angular.Exceptions;
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
                context.Result = new NotFoundObjectResult( new ApiNotFoundResponse(
                        notFoundException.Entity + " not found. Requested id = " + notFoundException.Id));
            }
            else if (context.Exception is BadRequestException)
            {
                var badRequestException = context.Exception as BadRequestException;
                context.Result = new BadRequestObjectResult(new ApiBadRequestResponse(
                        badRequestException.ErrorMessage));
            }
            return;
        }
    }
}
