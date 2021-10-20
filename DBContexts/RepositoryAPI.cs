using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;

namespace UsersApi.DBRepository
{
    //public interface IRepository<T> where T : class
    //{
    //    IEnumerable<T> Get();
    //    T Get(int id);
    //    void Create(T item);
    //    void Update(int id, T item);
    //    T Delete(int id);
    //}

    //public class EFRepository<T, TDBcontext> : IRepository<T> where TDBcontext : IDBContext<T> where T : class
    //{
    //    private TDBcontext Context;

    //    public EFRepository(TDBcontext context)
    //    {
    //        Context = context;
    //    }

    //    public IEnumerable<T> Get()
    //    {
    //        return Context.GetItems();
    //    }

    //    public T Get(int Id)
    //    {
    //        return Context.GetItems().Find(Id);
    //    }

    //    public void Create(T item)
    //    {
    //        Context.GetItems().Add(item);
    //        Context.SaveChanges();
    //    }

    //    public void Update(int id, T Item)
    //    {
    //        T currentItem = Get(id);
    //        Context.Entry(Item).State = EntityState.Modified;
    //        Context.SaveChanges();
    //    }

    //    public T Delete(int Id)
    //    {
    //        T Item = Get(Id);

    //        if (Item != null)
    //        {
    //            Context.GetItems().Remove(Item);
    //            Context.SaveChanges();
    //        }

    //        return Item;
    //    }
    //}    
}