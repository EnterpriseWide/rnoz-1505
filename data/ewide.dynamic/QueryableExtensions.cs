using System.Collections.Generic;
using System.Data.Objects;
using System.Linq.Expressions;

namespace System.Linq.Dynamic
{
    public static class QueryableExtensions
    {
        private static Expression<Func<TElement, bool>> GetWhereInExpression<TElement, TValue>(Expression<Func<TElement, TValue>> propertySelector, IEnumerable<TValue> values)
        {
            ParameterExpression p = propertySelector.Parameters.Single();
            if (!values.Any())
                return e => false;

            var equals = values.Select(value => (Expression)Expression.Equal(propertySelector.Body, Expression.Constant(value, typeof(TValue))));
            var body = equals.Aggregate<Expression>((accumulate, equal) => Expression.Or(accumulate, equal));

            return Expression.Lambda<Func<TElement, bool>>(body, p);
        }
        /// <summary> 
        /// Return the element that the specified property's value is contained in the specifiec values 
        /// </summary> 
        /// <typeparam name="TElement">The type of the element.</typeparam> 
        /// <typeparam name="TValue">The type of the values.</typeparam> 
        /// <param name="source">The source.</param> 
        /// <param name="propertySelector">The property to be tested.</param> 
        /// <param name="values">The accepted values of the property.</param> 
        /// <returns>The accepted elements.</returns> 
        public static IQueryable<TElement> WhereIn<TElement, TValue>(this IQueryable<TElement> source, Expression<Func<TElement, TValue>> propertySelector, params TValue[] values)
        {
            return (IQueryable<TElement>)source.Where(GetWhereInExpression(propertySelector, values));
        }
        /// <summary> 
        /// Return the element that the specified property's value is contained in the specifiec values 
        /// </summary> 
        /// <typeparam name="TElement">The type of the element.</typeparam> 
        /// <typeparam name="TValue">The type of the values.</typeparam> 
        /// <param name="source">The source.</param> 
        /// <param name="propertySelector">The property to be tested.</param> 
        /// <param name="values">The accepted values of the property.</param> 
        /// <returns>The accepted elements.</returns> 
        public static IQueryable<TElement> WhereIn<TElement, TValue>(this IQueryable<TElement> source, Expression<Func<TElement, TValue>> propertySelector, IEnumerable<TValue> values)
        {
            return (IQueryable<TElement>)source.Where(GetWhereInExpression(propertySelector, values));
        }
        public static IQueryable<T> Include<T>(this IQueryable<T> qry, string include)
        {
            return qry.Include<T>(new string[] { include });
        }
        public static IQueryable<T> Include<T>(this IQueryable<T> qry, string[] includes)
        {
            ObjectQuery<T> q = qry as ObjectQuery<T>;
            if (q != null && includes != null)
            {
                foreach (string include in includes)
                {
                    q = q.Include(include);
                }
                return (IQueryable<T>)q;
            }
            return qry;
        }
    }
}
