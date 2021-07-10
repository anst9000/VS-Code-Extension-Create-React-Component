const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');

const componentTemplatePath = path.join(__dirname, 'templates', 'component.template');
const indexTemplatePath = path.join(__dirname, 'templates', 'index.template');
const stylesTemplatePath = path.join(__dirname, 'templates', 'styles.template');

function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "new-react-component" is now active!');

  async function createComponent(uri, templatePath) {
    const componentName = await vscode.window.showInputBox({ prompt: 'Create Component name' });

    if (!componentName) {
      return;
    }

    // const parentFolder = uri ? uri.fsPath : vscode.workspace.rootPath;
    const parentFolder = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'src', 'components');
    const componentFolder = path.join(parentFolder, componentName);

    try {
      await fs.mkdir(componentFolder);

      const [componentTemplate, indexTemplate, stylesTemplate] = await Promise.all([
        fs.readFile(templatePath),
        fs.readFile(indexTemplatePath),
        fs.readFile(stylesTemplatePath),
      ]);

      const component = componentTemplate.toString().replace(/{componentName}/g, componentName);
      const index = indexTemplate.toString().replace(/{componentName}/g, componentName);
      const styles = stylesTemplate.toString().replace(/{componentName}/g, componentName);

      const componentPath = path.join(componentFolder, `${componentName}.js`);
      let componentIndexContent = `export * from "./${componentName}";\n`
      const componentIndexFile = path.join(parentFolder, 'index.js');

      await fs.writeFile(componentPath, component);
      await fs.writeFile(path.join(componentFolder, `index.js`), index);
      await fs.writeFile(path.join(componentFolder, 'styles.module.css'), styles);
      await fs.writeFile(componentIndexFile,
        componentIndexContent, { flag: 'a' });

      const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(componentPath));

      vscode.window.showTextDocument(doc);
    } catch (error) {
      console.error(error);
    }
  }


  context.subscriptions.push(
    vscode.commands.registerCommand('new-react-component.createComponent', (uri) =>
      createComponent(uri, componentTemplatePath),
    ),
  );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
