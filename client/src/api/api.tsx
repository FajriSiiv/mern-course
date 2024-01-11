export const getAPICourse = async () => {
  const res = await fetch("http://localhost:5000/course");
  const data = await res.json();

  return data;
};

export const handleAddCourse = async (body: any) => {
  try {
    await fetch("http://localhost:5000/course", {
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
  const API_URL = "http://localhost:5000/course";

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    console.log("berhasil di hapus");
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
