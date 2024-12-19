import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

class PerformanceVisualizer:
    def __init__(self):
        sns.set(style="whitegrid")

    def abbreviate_query_name(self, query_name):
        # Abbreviate or use key description words for the query names
        # For user-provided queries, we can just return the query itself or a truncated version
        return (query_name[:50] + '...') if len(query_name) > 50 else query_name

    def visualize_metrics(self, metrics):
        if not metrics:
            print("No metrics to visualize.")
            return

        # Abbreviate query names
        for metric in metrics:
            metric['query_name'] = self.abbreviate_query_name(metric['query_name'])

        df = pd.DataFrame(metrics)
        plt.figure(figsize=(12, 8))

        # Create a bar plot for query response times
        bar_plot = sns.barplot(x='query_name', y='response_time', data=df, palette='viridis')
        plt.title('Query Response Times', fontsize=16)
        plt.xlabel('Query', fontsize=14)
        plt.ylabel('Response Time (ms)', fontsize=14)
        plt.xticks(rotation=45, ha='right', fontsize=12)
        plt.yticks(fontsize=12)
        plt.tight_layout()

        # Annotate the bars with the response time values
        for p in bar_plot.patches:
            bar_plot.annotate(format(p.get_height(), '.2f'),
                              (p.get_x() + p.get_width() / 2., p.get_height()),
                              ha='center', va='center',
                              xytext=(0, 9),
                              textcoords='offset points')

        plt.show()