from flask import Flask, request, render_template
from stories import story

app = Flask(__name__)

@app.route('/')
def home():
    """Show form to ask for words."""
    return render_template('form.html', prompts=story.prompts)

@app.route('/story')
def show_story():
    """Show story result."""
    answers = {prompt: request.args[prompt] for prompt in story.prompts}
    generated_story = story.generate(answers)
    return render_template('story.html', story=generated_story)

if __name__ == '__main__':
    app.run(debug=True)