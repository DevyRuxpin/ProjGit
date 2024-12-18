import matplotlib.pyplot as plt

class PerformanceVisualizer:
    def visualize_metrics(self, metrics):
        query_names = [metric['query_name'] for metric in metrics]
        response_times = [metric['response_time'] for metric in metrics]

        plt.bar(query_names, response_times)
        plt.xlabel('Queries')
        plt.ylabel('Response Time (ms)')
        plt.title('SQL Query Performance Metrics')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

    def generate_report(self, metrics):
        report = "SQL Performance Report\n"
        report += "=" * 30 + "\n"
        for metric in metrics:
            report += f"Query: {metric['query_name']}, Response Time: {metric['response_time']} ms\n"
        return report