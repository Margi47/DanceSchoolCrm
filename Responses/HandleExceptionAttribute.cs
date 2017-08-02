using angular.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
            else if (context.Exception is SqlException)
            {
                var result = context.Exception as SqlException;
                string message;
                switch (result.Number)
                {

                    case 547:
                        // ForeignKey Violation
                        message = "Entity not found.";
                        break;
                    case 2627:
                        // Unique Index/Constriant Violation
                        message = "Entity already exists";
                        break;
                    case 2601:
                        // Unique Index/Constriant Violation
                        message = "Entity alseady exists";
                        break;
                    default:
                        // throw a general DAL Exception
                        message = "Unhandled error occurred";
                        break;
                }

                context.Result = new ObjectResult(new ApiErrorResponse(message));
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
