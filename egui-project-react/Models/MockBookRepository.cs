using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using CsvHelper;

namespace egui_project_react.Models
{
    public class MockBookRepository : IBookRepository
    {
        private List<Book> _books;

        public MockBookRepository()
        {
            if (_books == null)
            {
                InitializeBooks();
            }
        }

        private void InitializeBooks()
        {
            _books = new List<Book>();
            
            using (var reader = new StreamReader("/home/robert/RiderProjects/egui-project-react/egui-project-react/data/dane3.csv"))
            using (var csv = new CsvReader(reader))
            {
                csv.Configuration.HasHeaderRecord = true;
                csv.Configuration.Delimiter = ";";
                _books = csv.GetRecords<Book>().ToList();
            }

        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _books;
        }

        public Book GetBook(string title)
        {
            return _books.FirstOrDefault(p => p.Title == title);
        }

        public void addBook(Book book)
        {
            _books.Insert(0,book);
        }

        public void deleteBook(List<int> _ids)
        {
            _books.RemoveAll(t => _ids.Contains(t.Id));
            Console.WriteLine("oooooooooooooooo");
            foreach (var VARIABLE in _books)
            {
                Console.WriteLine(VARIABLE.Author);
            }
        }

        public void updateBook(Book book)
        {
            throw new System.NotImplementedException();
        }
    }
}