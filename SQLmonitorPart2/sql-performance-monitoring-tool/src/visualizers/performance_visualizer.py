from bokeh.plotting import figure
from bokeh.embed import components

def create_bokeh_plot():
    p = figure(title="SQL Query Performance", x_axis_label='Time', y_axis_label='Query Time (ms)')
    p.line([1, 2, 3, 4, 5], [6, 7, 2, 4, 5], legend_label="Query Time", line_width=2)
    script, div = components(p)
    return script