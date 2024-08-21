import express from "express";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  // send an HTML form for editing
  res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="Alexander Badenhorst">
      </div>
      <div class="mb-3">
       <label for="bio" class="form-label">Bio</label>
       <textarea type="text" class="form-control" id="bio" name="bio">Web Developer in training | Sports Shooter | Drinker of Wine and Lover of Women
       </textarea>
      </div>
      <button type="submit" class="btn btn-primary">
        Save Changes
      </button>
      <button type="submit" hx-get="/index.html"
        class="btn btn-secondary">
        Cancel
      </button>
    </form>
  `);
});

// Handle PUT request for editing
app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  // Send the updated profile back
  res.send(`
    <div class="card" style="width: 18rem;"
      hx-target="this"
      hx-swap="outerHTML"
      >
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">
        ${bio}
      </p>
      <button href="#" class="btn btn-primary"
      hx-get="/user/1/edit">
        Click To Edit
      </button>
    </div>
  </div>
  `);
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
