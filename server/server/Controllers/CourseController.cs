using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using server.models;
using System.Threading;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses = new List<Course>
        {
            new Course("Introduction to Programming","Introduction to Programming is a foundational course designed to provide learners with a comprehensive understanding of basic programming concepts and principles. Through this course, participants will acquire essential skills in problem-solving, algorithmic thinking, and software development. Topics covered typically include programming fundamentals, data types, control structures, functions, and an introduction to object-oriented programming. This course serves as a starting point for individuals with little to no prior programming experience, aiming to equip them with the knowledge and skills necessary to pursue further studies or careers in software development and computer science.",0,120,"2024-05-01",new string[] {"Basics of programming", "Data structures", "Algorithms"}, LearningType.FRONTAL,0,"https://res.cloudinary.com/midrag/image/upload/c_scale,w_1206,q_auto,f_auto/Cms/num5usjaewqcsifk8p9i.jpg"),
            new Course("Web Development Fundamentals","Web Development Fundamentals is a beginner-level course that provides an overview of the core concepts and technologies used in web development. Participants will learn about HTML, CSS, and JavaScript, the building blocks of web pages, as well as essential tools and techniques for creating responsive and interactive websites. This course is suitable for individuals interested in starting a career in web development or anyone looking to gain a basic understanding of how websites are built and maintained.",0,40,"2024-06-01",new string[]  { "HTML", "CSS", "JavaScript"},LearningType.Digital,1,"https://webpro.co.il/wp-content/uploads/2013/04/Websites.jpg"),
            new Course("Data Science Essentials","Data Science Essentials is a foundational course introducing key concepts and techniques in data science. Participants will learn about data analysis, statistical methods, machine learning algorithms, and data visualization. This course is suitable for beginners looking to enter the field of data science or anyone interested in understanding how data is analyzed and utilized to derive insights and make informed decisions.",1,40,"2024-07-01",new string[] {"Statistics",  "Machine Learning" ,  "Data Visualization" },LearningType.Digital,3,"https://rt-ed.co.il/wp-content/themes/realtime/imgs/path-img/data-science.webp"),
            new Course("Cybersecurity Fundamentals","Cybersecurity Fundamentals is a beginner's course covering essential concepts in cybersecurity. Participants will learn about various threats, security measures, and best practices for protecting digital assets and information. This course is suitable for individuals interested in understanding the fundamentals of cybersecurity to enhance their digital security awareness.",2,30,"2024-09-01",new string[] {"Network Security", "Encryption", "Threat Analysis"},LearningType.Digital,2,"https://rt-ed.co.il/wp-content/uploads/2021/04/embedded-security-e1619354591581.jpg"),
            new Course("Graphic Design Fundamentals","Graphic Design Fundamentals is an introductory course that covers essential concepts and principles in graphic design. It provides a comprehensive overview of design elements such as typography, color theory, layout, and composition. Students will learn how to effectively communicate ideas visually and develop skills in using design software tools. The course aims to equip learners with the foundational knowledge and techniques necessary to create visually appealing and impactful graphic designs.",0,64,"2024-11-01",new string[] {"Design Principles", "Adobe Photoshop", "Adobe Illustrator"},LearningType.FRONTAL,1,"https://www.uclaextension.edu/sites/default/files/styles/course_hero/public/2017-10/design-fundamentals-desmax479-6a.jpg?itok=3gxB87C2"),
            new Course("Photography Essentials","Photography Essentials is a foundational course designed to equip participants with essential skills and knowledge in photography. Through this course, students will learn fundamental principles such as composition, lighting techniques, exposure control, and camera settings. Additionally, they will gain practical experience in capturing images across various subjects and environments. Whether beginners or enthusiasts, participants will develop the necessary skills to enhance their photography abilities and express their creative vision effectively.",3,25,"2024-05-08",new string[] {"Camera Basics", "Composition Techniques", "Image Editing"},LearningType.FRONTAL,2,"https://www.shirideitch.com/wp-content/uploads/2019/09/camera.jpg")
        };
        // GET: api/<CourseController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            var course = courses.Find(x => x.Id == id);
            if (course != null)
                return course;
            return null;
        }

        // POST api/<CourseController>
        [HttpPost]
        public void Post([FromBody] Course value)
        {
            var course = courses.Find(x => x.Id == value.Id);
            if (course != null)
            {
                course.LecturerId = value.LecturerId;
                course.Image = value.Image;
                course.Name = value.Name;
                course.Amount = value.Amount;
                course.BeginDate = value.BeginDate;
                course.CategoryId = value.CategoryId;
                course.LearningType = value.LearningType;
                course.Syllabus = value.Syllabus;
            }
            else
            {
                courses.Add(new Course(value.Name, value.Description, value.CategoryId, value.Amount, value.BeginDate, value.Syllabus, value.LearningType, value.LecturerId, value.Image));
            }
            //courses.Add(new Course(value.Name,value.Description,value.CategoryId,value.Amount,value.BeginDate,value.Syllabus,value.LearningType,value.LecturerId,value.Image));
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Course value)
        {
            var course = courses.Find(x => x.Id == id);
            if (course != null)
            {
                course.LecturerId = value.LecturerId;
                course.Image = value.Image;
                course.Name = value.Name;
                course.Amount = value.Amount;
                course.BeginDate = value.BeginDate;
                course.CategoryId = value.CategoryId;
                course.LearningType = value.LearningType;
                course.Syllabus = value.Syllabus;
            }
            else
            {
                courses.Add(new Course(value.Name, value.Description, value.CategoryId, value.Amount, value.BeginDate, value.Syllabus, value.LearningType, value.LecturerId, value.Image));
            }
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var course = courses.Find(x => x.Id == id);
            if (course != null)
            {
                courses.Remove(course);
            }

        }
    }
}
