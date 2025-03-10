from flask import Blueprint, send_from_directory, render_template
import yaml

bp = Blueprint('docs', __name__, url_prefix='/docs')

@bp.route('/')
def api_docs():
    """Render API documentation"""
    with open('app/docs/openapi.yaml', 'r') as f:
        spec = yaml.safe_load(f)
    return render_template('docs/swagger.html', spec=spec)

@bp.route('/openapi.yaml')
def openapi_spec():
    """Serve OpenAPI specification"""
    return send_from_directory('docs', 'openapi.yaml')
