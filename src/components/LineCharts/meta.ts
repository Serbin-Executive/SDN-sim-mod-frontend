export type TChartLabels = number[];

export interface IDataset {
    label: string;
    data: number[];
    borderColor?: string;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
}

export type TDatasets = IDataset[];

export interface IChartData {
    labels: TChartLabels;
    datasets: TDatasets;
}

export const enum ChartLabelsNames {
    LOAD_FACTOR_FROM_TIME = "Load factor from time",
    QUEUE_LOAD_FROM_TIME = "Queue load from time",
}

export const enum ChartColors {
    BLUE = "blue",
    GREEN = "green",
}
