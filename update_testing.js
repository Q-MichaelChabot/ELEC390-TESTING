// Import required modules
const { execSync } = require('child_process');

// Get today's date in YYYY-MM-DD format
const todayDate = new Date().toISOString().split('T')[0];

// Set the commit message
const commitMessage = `release ${todayDate}`;

try {
  // Checkout a new orphan branch
  console.log("Checking out a new orphan branch...");
  execSync('git checkout --orphan temp_branch', { stdio: 'inherit' });

  // Add all files to the new branch
  console.log("Adding all files...");
  execSync('git add -A', { stdio: 'inherit' });

  // Commit the changes with the formatted commit message
  console.log("Creating a new commit...");
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // Delete the old branch named 'main'
  console.log("Deleting the old 'main' branch...");
  execSync('git branch -D main', { stdio: 'inherit' });

  // Rename the new branch to 'main'
  console.log("Renaming 'temp_branch' to 'main'...");
  execSync('git branch -m main', { stdio: 'inherit' });

  // Force push the new 'main' branch to the remote repository
  console.log("Force pushing the new 'main' branch to origin...");
  execSync('git push -f origin main', { stdio: 'inherit' });

  console.log("Git history has been flattened to the latest commit.");
} catch (error) {
  console.error("An error occurred:", error.message);
}
