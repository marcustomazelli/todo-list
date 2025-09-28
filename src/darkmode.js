export function darkTheme(){
    const html = document.documentElement;
    const btnDarkMode = document.querySelector("#darkModeToggle");

    localStorage.setItem("darkMode", false);

    btnDarkMode.addEventListener("click", ()=>{
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const moon = document.querySelector("#moon");
    const sun = document.querySelector("#sun");
  
  
    localStorage.setItem('darkMode', !darkMode);
  
  
    html.classList.toggle("dark");
  

    moon.classList.toggle('text-black');
    moon.classList.toggle('text-yellow-300');
    sun.classList.toggle('text-yellow-300');
    sun.classList.toggle('text-black');
})
}