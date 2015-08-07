using ewide.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ewide.web.Extensions
{
    public static class Filters
    {
        public static IQueryable<CoachingSession> OnDay(this IQueryable<CoachingSession> qry, DateTime day)
        {
            DateTime start = day;
            DateTime end = day.AddDays(1);
            return qry.OnAtSameTime(start, end);
        }

        public static IQueryable<CoachingSession> OnAtSameTime(this IQueryable<CoachingSession> qry, DateTime start, DateTime end)
        {
            return (IQueryable<CoachingSession>)
                from p in qry
                where p.StartedAt >= start && p.StartedAt < end
                || p.FinishedAt > start && p.FinishedAt <= end
                select p;
        }
    }
}