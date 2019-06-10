using System.Collections;
using System.Collections.Generic;
using System.Net.NetworkInformation;

namespace egui_project_react.Models
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetAllBooks();
        Book GetBook(string name);

        void addBook(Book book);
        void deleteBook(List<int> _ids);
        void updateBook(Book book);
    }
}