export interface DormProps {
  id: string;
  name: string;
  location?: string | null;
}

export class Dorm {
  private constructor(private props: DormProps) {}

  static create(props: DormProps) {
    return new Dorm(props);
  }

  toJSON() {
    return this.props;
  }
}

