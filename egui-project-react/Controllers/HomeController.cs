﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using egui_project_react.Models;
using egui_project_react.ViewModel;
using Newtonsoft.Json;

namespace egui_project_react.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBookRepository _bookRepository;

        public HomeController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public JsonResult Create([FromBody] Book book)
        {
            book.Id = 0;
           foreach (var b in _bookRepository.GetAllBooks())
           {
               if (b.Id > book.Id)
               {
                   book.Id = b.Id;
               }
           }

           book.Id++;
           _bookRepository.addBook(book);
            return Json(book);
        }

        public JsonResult Edit([FromBody] Book book)
        {
            return Json(book);
        }
        public JsonResult Delete([FromBody] List<int> _ids)
        {
            foreach (var id in _ids)
            {
                Console.WriteLine(_ids);
            }
            return Json(_ids);
        }
        
        
        public IActionResult Index()
        {
            var books = _bookRepository.GetAllBooks().OrderBy(p => p.Title);
            var homeViewModel = new HomeViewModel()
            {
                Books = books.ToList()
            };
            var json = JsonConvert.SerializeObject(books); 
            return View(homeViewModel);
        }

        public JsonResult List()
        {
            var books = _bookRepository.GetAllBooks().OrderBy(p => p.Title);
            var homeViewModel = new HomeViewModel()
            {
                Books = books.ToList()
            };

            return Json(homeViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}