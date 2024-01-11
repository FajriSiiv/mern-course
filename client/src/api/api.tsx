export const getAPICourse = async () => {
  const res = await fetch("https://backend-mern-course.vercel.app/course");
  const data = await res.json();

  return data;
};

export const handleAddCourse = async (body: any) => {
  try {
    await fetch("https://backend-mern-course.vercel.app/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("berhasil");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const handleDeleteCourse = async (id: any) => {
  const API_URL = "https://backend-mern-course.vercel.app/course";

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    console.log("berhasil di hapus");
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
